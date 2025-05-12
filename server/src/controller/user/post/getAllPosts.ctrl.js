import { getAllPostsService } from "../../../service/user/user_post.service.js";

import { RENDER_BAD_REQUEST } from "../../../util/utils.js";

const getAllPostCtrl = async (req, res) => {
    try {
        const { error, error_message, data } = await getAllPostsService();
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

export default getAllPostCtrl;