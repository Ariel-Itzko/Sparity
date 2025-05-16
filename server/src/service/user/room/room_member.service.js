import { getRoomById, getRoomsForUser, isUserAdmin, removeParticipant } from "../../../dal/room/room_member.dal.js";

export const getRoomMembersService = async (user_id) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };
    const data = await getRoomsForUser(user_id);
    if (!data) {
        resp.error = true;
        resp.error_message = 'No data found';
        return resp;
    }

    resp.data = data;
    return resp;
};

export const getRoomByIdService = async (post_id) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };

    const data = await getRoomById(post_id);
    if (!data) {
        resp.error = true;
        resp.error_message = 'No Room Found';
        return resp;
    }

    resp.data = data;
    return resp;
};

export const removeParticipantService = async (post_id, user_id, userProfile_id) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };
    const isAdmin = await isUserAdmin(post_id, userProfile_id);
    if (!isAdmin) {
        resp.error = true;
        resp.error_message = 'Authentication error: You have no access';
        return resp;
    }

    const data = await removeParticipant(post_id, user_id);
    if (!data) {
        resp.error = true;
        resp.error_message = 'No data found';
        return resp;
    }

    resp.data = data;
    return resp;
};

export const deleteRoomByPostIdService = async (post_id, userProfile_id) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };

    const isAdmin = await isUserAdmin(post_id, userProfile_id);
    if (!isAdmin) {
        resp.error = true;
        resp.error_message = 'Authentication error: You have no access';
        return resp;
    }

    const data = await deleteRoomByPostId(post_id);
    if (!data) {
        resp.error = true;
        resp.error_message = 'No room found';
        return resp;
    }

    resp.data = data;
    return resp;
};