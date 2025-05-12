import { getUserAllRespPostService } from "../../../../service/user/post_resp.service.js";
import { RENDER_BAD_REQUEST } from "../../../../util/utils.js";

const getUserAllRespCtrl = async (req, res) => {
    try {
        const { error, error_message, data } = await getUserAllRespPostService(req.user);
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

export default getUserAllRespCtrl;