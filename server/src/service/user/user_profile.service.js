import { updateUserProfile } from "../../dal/user/user_profile.dal.js";

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
    console.log(data);
    if (!data) {
        resp.error = true;
        resp.error_message = 'updation failed';
        return resp;
    }

    resp.data = data;
    return resp;
};