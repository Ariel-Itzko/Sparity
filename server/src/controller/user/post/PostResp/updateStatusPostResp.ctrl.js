import _ from 'lodash';

import { updateStatusPostService } from "../../../../service/user/post_resp.service.js";
import { CHECK_REQUIRED_PARAMS, RENDER_BAD_REQUEST } from "../../../../util/utils.js";

const updateStatusPostRespCtrl = async (req, res) => {
    try {
        const all_params = [
            'post_id',
            'status',
            'update_user_id'
        ];
        const body = _.pick(req.body, all_params);

        const { is_missing, missing_key } = CHECK_REQUIRED_PARAMS(body, all_params);
        if (is_missing) {
            return res.status(400).json({
                message: 'request params missing => ' + missing_key
            });
        }
        const { error, error_message, data } = await updateStatusPostService(req.user, update_user_id, body.post_id, body.status);
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

export default updateStatusPostRespCtrl;