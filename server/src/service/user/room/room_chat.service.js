import { addMessageToRoom, getMessagesByRoomId } from "../../../dal/room/room_chat.dal.js";

export const getMessagesByRoomService = async (room_id) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };

    const data = await getMessagesByRoomId(room_id);
    if (!data) {
        resp.error = true;
        resp.error_message = 'No Room Chat found';
        return resp;
    }

    resp.data = data;
    return resp;
};

export const addMessageToRoomService = async (room_id, sender_id, message) => {
    let resp = {
        error: false,
        error_message: '',
        data: {}
    };

    const data = await addMessageToRoom(room_id, sender_id, message);
    if (!data) {
        resp.error = true;
        resp.error_message = 'message_send: false';
        return resp;
    }

    resp.data = {
        message_send: true
    };
    return resp;
};
