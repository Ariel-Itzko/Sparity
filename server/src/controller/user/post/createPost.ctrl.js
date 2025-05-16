import _ from 'lodash'

import { createNewPostService } from "../../../service/user/user_post.service.js";
import { CHECK_REQUIRED_PARAMS, RENDER_BAD_REQUEST } from "../../../util/utils.js";

const createPostCtrl = async (req, res) => {
    try {
        const all_params = [
            'post_text',
            'post_heading',
            'required_skills',
        ];
        const body = _.pick(req.body, all_params);

        const { is_missing, missing_key } = CHECK_REQUIRED_PARAMS(body, all_params);
        if (is_missing) {
            return res.status(400).json({
                message: 'request params missing => ' + missing_key
            });
        }

        const { error, error_message, data } = await createNewPostService(
            req.user,
            body.post_text,
            body.post_heading,
            body.required_skills,
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

export default createPostCtrl;