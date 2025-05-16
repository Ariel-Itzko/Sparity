import _ from "lodash";
import { addMessageToRoomService } from "../../../../service/user/room/room_chat.service.js";

import { CHECK_REQUIRED_PARAMS, RENDER_BAD_REQUEST } from "../../../../util/utils.js";

const addMessagesToRoom = async (req, res) => {
    try {
        const all_params = [
            'room_id',
            'message',
        ];
        const body = _.pick(req.body, all_params);

        const { is_missing, missing_key } = CHECK_REQUIRED_PARAMS(body, all_params);
        if (is_missing) {
            return res.status(400).json({
                message: 'request params missing => ' + missing_key
            });
        }
        
        const { error, error_message, data } = await addMessageToRoomService(
            body.room_id,
            req.userProfile._id,
            body.message
        );

      
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

export default addMessagesToRoom