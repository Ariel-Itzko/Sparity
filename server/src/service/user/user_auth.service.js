import crypto from 'crypto';
import base62 from 'base62-random'
import moment from 'moment';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';

import {
    createSessions,
    createUser,
    fetchUserFromSession,
    getUserByCredentials,
    IsUserExist,
    removeAllSessionsByMemberId
} from '../../dal/user/user.dal.js';
import { createEmptyProfile, getUserProfileByUserId } from '../../dal/user/user_profile.dal.js';


const _prepareSessionToken = (remember_me) => {
    const auth_token = base62(40);
    const auth_exp = remember_me
        ? moment().add(30, 'days')
        : moment().add(60, 'minutes');

    return {
        auth_token,
        auth_exp
    };
};

const _createSession = async (member_id, remember_me, resp) => {
    const { auth_token, auth_exp } = _prepareSessionToken(remember_me);
    await createSessions(member_id, auth_token, auth_exp.toDate());
    const payload = {
        member_id,
        auth_token,
    };
    resp.data = {
        ...resp.data,
        auth_token: jwt.sign(payload, process.env.JWT_SECRET)
    }
    return resp;
};

export const registerUser = async (email, first_name, last_name, unmask_password, remember_me) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };

    const exist = await IsUserExist(email);
    if (exist) {
        resp.error = true;
        resp.error_message = 'user with same email already exist';
        return resp;
    }

    const email_domain_split = email.split('@');
    if (email_domain_split.length !== 2) {
        resp.error = true;
        resp.error_message = 'invalid email entered, not a valid @domain';
        return resp;
    };

    const member_id = v4();
    const password = crypto.createHash('sha256').update(unmask_password).digest('hex');

    const { auth_token, auth_exp } = _prepareSessionToken(remember_me);
    const sessionObj = {
        auth_token,
        auth_exp,
        refresh_token: '',
        refresh_exp: auth_exp,
        is_active: true
    }

    const userObj = {
        email,
        password,
        member_id,
        is_active: true,
        tokens: [sessionObj]
    };

    const user = await createUser(userObj);

    let profile = await createEmptyProfile(user._id, first_name, last_name);



    const payload = {
        member_id,
        auth_token
    };
    resp.data = {
        ...resp.data,
        auth_token: jwt.sign(payload, process.env.JWT_SECRET),
        user,
        profile
    }

    return resp;
};

export const loginUser = async (email, unmask_password, remember_me) => {
    let resp = {
        error: false,
        auth: true,
        error_message: '',
        data: {}
    };

    const exist = await IsUserExist(email);
    if (!exist) {
        resp.error = true;
        resp.error_message = 'Incorrect Email or Password';
        return resp;
    }

    const password = crypto.createHash('sha256').update(unmask_password).digest('hex');
    const user = await getUserByCredentials(email, password);
    if (!user) {
        resp.auth = false;
        resp.error_message = 'Incorrect Email or Password';
        return resp;
    }

    resp = await _createSession(user.member_id, remember_me, resp);

    let profile = await getUserProfileByUserId(user._id);
    if (!profile) {
        profile = await createEmptyProfile(user._id);
    }

    resp.data = {
        ...resp.data,
        user,
        profile
    }

    return resp;
}

export const getUserWithToken = async (auth_token, member_id) => {
    let resp = {
        auth_failed: false,
        user: undefined
    };

    const user = await fetchUserFromSession(auth_token, member_id);
    if (!user) {
        resp.auth_failed = true;
        return resp
    }
    resp.user = user;
    return resp;
};

export const logoutUser = async (member_id, user) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };

    await removeAllSessionsByMemberId(member_id);

    if (user.is_guest_user) {
        const guest_profile = await getUserProfileByUserId(user._id);
        user.is_deleted = true;
        guest_profile.is_deleted = true;

        user.save();
        guest_profile.save();
    }

    resp.data = {
        logged_out: true
    };
    return resp;
};

export const userChnagePassword = async (user, old_password, new_password) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };

    const old_pass_hash = crypto.createHash('sha256').update(old_password).digest('hex');
    if (user.password !== old_pass_hash) {
        resp.error = true;
        resp.error_message = 'Invalid old password!';
        return resp;
    };
    const new_pass_hash = crypto.createHash('sha256').update(new_password).digest('hex');
    user.password = new_pass_hash;
    await user.save();


    resp.data = {
        updated_password: true
    }

    return resp
};