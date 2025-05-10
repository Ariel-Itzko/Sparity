import UserProfileModel from "../../model/user/UserProfile.model.js";

export const getUserProfileById = async (id) => {
    return UserProfileModel.findById(id);
};

//RESTRICTED TO USE COMMANLY
export const getUsersProfile = async () => {
    return UserProfileModel.find()
};

export const getUserProfileByUserId = async (user_id) => {
    return UserProfileModel.findOne({
        user_id
    })
};

export const updateUserProfile = async (user_id, updateData) => {
    return await UserProfileModel.findOneAndUpdate(
        { user_id },
        updateData,
        { new: true }
    );
};

export const createEmptyProfile = async (user_id, first_name, last_name) => {
    const profile = new UserProfileModel();
    profile.user_id = user_id;

    first_name ? profile.first_name = first_name : false;
    last_name ? profile.last_name = last_name : false;

    await profile.save();
    return profile;
};