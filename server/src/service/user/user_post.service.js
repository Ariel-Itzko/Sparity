import {
    createUserPost,
    getUserPostById,
    getAllUserPosts,
    getUserPostsByUserId,
    updateUserPost,
    deleteUserPost
} from '../../dal/user/user_post.dal.js';
import { getUserProfileByUserId } from '../../dal/user/user_profile.dal.js';

export const createNewPostService = async (user, post_text, post_heading, required_skills) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };
    let UserProfileData = await getUserProfileByUserId(user._id)

    const postObject = {
        user_id: UserProfileData._id,
        post_text,
        post_heading,
        required_skills
    };

    const data = await createUserPost(postObject);
    if (!data) {
        resp.error = true;
        resp.error_message = 'upload_post: false';
        return resp;
    }

    resp.data = {
        upload_post: true
    };
    return resp;
};

export const getPostByIdService = async (postId) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };

    const data = await getUserPostById(postId);
    if (!data) {
        resp.error = true;
        resp.error_message = 'post_not_found';
        return resp;
    }

    resp.data = data;
    return resp;
};

export const getAllPostsService = async () => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };

    const data = await getAllUserPosts();
    resp.data = data || [];
    return resp;
};

export const getPostsByUserIdService = async (userId) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };

    const UserProfileData = await getUserProfileByUserId(userId);
    const data = await getUserPostsByUserId(UserProfileData._id);
    resp.data = data || [];
    return resp;
};

export const updatePostService = async (postId, post_text, post_heading, required_skills) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };

    const postObject = {
        user_id: user._id,
        post_text,
        post_heading,
        required_skills
    };

    const data = await updateUserPost(postId, postObject);
    if (!data) {
        resp.error = true;
        resp.error_message = 'update_failed';
        return resp;
    }

    resp.data = {
        update_success: true,
        updated_post: data
    };
    return resp;
};

export const removePostService = async (user, postId) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };

    const data = await deleteUserPost(user._id, postId);
    if (!data) {
        resp.error = true;
        resp.error_message = 'delete_failed_or_not_authorized';
        return resp;
    }

    resp.data = {
        delete_success: true
    };
    return resp;
};

