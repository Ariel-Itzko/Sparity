import { getUserProfileByUserId, getUserProfileByUsername, updateUserProfile } from "../../dal/user/user_profile.dal.js";

export const ProfileUpdateFirstTimeService = async (user, gender, date_of_birth, country, user_prefer, city) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };

    const updateObject = {
        gender,
        date_of_birth,
        country,
        city,
        user_prefer,
        is_demographic_updated: true
    }

    const data = await updateUserProfile(user._id, updateObject);
    if (!data) {
        resp.error = true;
        resp.error_message = 'updation failed';
        return resp;
    }

    resp.data = data;
    return resp;
};

export const getUserProfileService = async (user_id) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };

    const data = await getUserProfileByUserId(user_id);
    if (!data) {
        resp.error = true;
        resp.error_message = 'No profile found';
        return resp;
    }

    resp.data = data;
    return resp;
};

export const ProfileUserNameUpdateService = async (user, req_user_profile, username) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };
    const isProfileExsist = await getUserProfileByUsername(username);
    
    if (req_user_profile.is_user_name_set) {
        resp.error = true;
        resp.error_message = 'something went wrong'
        return resp;
    }
    if (isProfileExsist) {
        resp.error = true;
        resp.error_message = 'username already used'
        return resp;
    }
    const updateObject = {
        user_name: username,
        is_user_name_set: true
    };

    const userprofile = await updateUserProfile(user._id, updateObject);
    if (!userprofile) {
        resp.error = true;
        resp.error_message = 'Updatation failed';
        return resp;
    }

    resp.data = userprofile;
    return resp;
};