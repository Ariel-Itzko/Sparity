import { getRoomMembersService } from "../../../../service/user/room/room_member.service.js";

import { RENDER_BAD_REQUEST } from "../../../../util/utils.js";

const getRoomMembersCtrl = async (req, res) => {
    try {
        const { error, error_message, data } = await getRoomMembersService(req.userProfile._id);
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

export default getRoomMembersCtrl;