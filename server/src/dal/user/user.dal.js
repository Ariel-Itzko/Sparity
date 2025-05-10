import UserModel from "../../model/user/User.model.js";

export const getUserByMemberId = async (member_id) => {
    return await UserModel.findOne({
        member_id
    })
}

export const IsUserExist = async (email) => {
    const exist = await UserModel.countDocuments(
        {
            email,
        }
    )
    return exist > 0;
};

export const getUserByCredentials = async (email, password) => {
    return UserModel.findOne({
        email,
        password
    })
};

export const createUser = async (userObj) => {
    const user = new UserModel(userObj);
    await user.save();
    return user;
};

export const createSessions = async (member_id, auth_token, auth_exp) => {
    const refresh_token = '';
    const refresh_exp = auth_exp;
    const is_active = true;

    const user = await UserModel.findOne({
        member_id,
    });

    user.tokens.push({
        auth_token,
        auth_exp,
        refresh_token,
        refresh_exp,
        is_active,
    });

    return await user.save();
};

export const fetchUserFromSession = async (auth_token, member_id) => {
    const user = await UserModel.findOne(
        {
            member_id,
            'tokens.auth_token': auth_token
        }
    );

    if (!user) {
        return false
    }

    return user
};


export const removeAllSessionsByMemberId = async (member_id, auth_exp) => {
    const user = await getUserByMemberId(member_id);
    user.tokens = [];
    return user.save();
};

export const getUserByEmail = async (email) => {
    return UserModel.findOne({
        email
    })
};

