import _ from 'lodash'

import { getAllRespOfPostService } from "../../../../service/user/post_resp.service.js";
import { RENDER_BAD_REQUEST } from "../../../../util/utils.js";

const getPostRespCtrl = async (req, res) => {
    try {
        const { post_id } = req.params;
        const { error, error_message, data } = await getAllRespOfPostService(post_id);
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

export default getPostRespCtrl;