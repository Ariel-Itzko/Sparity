import { getMessagesByRoomService } from "../../../../service/user/room/room_chat.service.js";

import { RENDER_BAD_REQUEST } from "../../../../util/utils.js";

const getMessagesByRoomCtrl = async (req, res) => {
    try {
        const { room_id } = req.params;
        const { error, error_message, data } = await getMessagesByRoomService(room_id);
        if (error) {
            return res.status(400).json({
                message: error_message,
            });
        };
        res.json(data);
    } catch (error) {
        RENDER_BAD_REQUEST(res, error);
    }
};

export default getMessagesByRoomCtrl