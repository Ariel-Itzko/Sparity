import _ from 'lodash';

import { logoutUser } from '../../../service/user/user_auth.service.js';
import { RENDER_BAD_REQUEST } from '../../../util/utils.js';

export const userLogoutCtrl = async (req, res) => {

    try {
        const { error, error_message, data } = await logoutUser(
            req.user.member_id,
            req.user,
        );

        if (error) {
            return res.status(400).json({
                message: error_message
            })
        }

        res.json({
            data
        });

    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};