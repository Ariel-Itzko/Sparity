import { addNewUser_PostResp, getallResp_PostResp, getAllUserPostResponses, updateResp_PostResp } from "../../dal/post/post_response.dal.js";
import { getUserPostById } from "../../dal/post/user_post.dal.js";
import { getUserProfileByUserId } from "../../dal/user/user_profile.dal.js";

export const addUserInRespPostService = async (user, post_id) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };
    const UserProfile = await getUserProfileByUserId(user._id)

    const data = await addNewUser_PostResp(post_id, UserProfile._id);
    if (!data) {
        resp.error = true;
        resp.error_message = 'No data found';
        return resp;
    }

    resp.data = data;
    return resp;
};

export const getAllRespOfPostService = async (post_id) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };

    const data = await getallResp_PostResp(post_id);
    if (!data) {
        resp.error = true;
        resp.error_message = 'No data found';
        return resp;
    }

    resp.data = data;
    return resp;
};

export const updateStatusPostService = async (user, update_user_id, post_id, status) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };

    const userProfile = await getUserProfileByUserId(user._id);

    let Post = await getUserPostById(post_id);
    if (!Post.user_id == userProfile._id) {
        resp.error = true;
        resp.error_message = 'Unauthorized query on resp_post';
        return resp;
    }

    const data = await updateResp_PostResp(post_id, update_user_id, status);
    if (!data) {
        resp.error = true;
        resp.error_message = 'No data found';
        return resp;
    }

    resp.data = data;
    return resp;
};

export const getUserAllRespPostService = async (user) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };

    const UserProfile = await getUserProfileByUserId(user._id);
    const data = await getAllUserPostResponses(UserProfile._id);
    if (!data) {
        resp.error = true;
        resp.error_message = 'No data found';
        return resp;
    }

    resp.data = data;
    return resp;
};