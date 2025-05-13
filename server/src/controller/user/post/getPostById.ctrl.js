import { getPostByIdService } from "../../../service/user/user_post.service.js";

import { RENDER_BAD_REQUEST } from "../../../util/utils.js";

const getPostByIdCtrl = async (req, res) => {
    try {
        const { postId } = req.params;
        const { error, error_message, data } = await getPostByIdService(postId);
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

export default getPostByIdCtrl;