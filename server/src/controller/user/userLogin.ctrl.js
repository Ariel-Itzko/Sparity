import _ from 'lodash';

import { loginUser } from '../../service/user/user_auth.service.js';
import { CHECK_REQUIRED_PARAMS, RENDER_BAD_REQUEST } from '../../util/utils.js';

export const userLoginCtrl = async (req, res) => {
    try {

        const all_params = [
            'email',
            'password',
            'remember_me'
        ];
        const body = _.pick(req.body, all_params);

        const { is_missing, missing_key } = CHECK_REQUIRED_PARAMS(body, all_params);
        if (is_missing) {
            return res.status(400).json({
                message: 'request params missing => ' + missing_key
            });
        }

        const { error, auth, error_message, data } = await loginUser(
            body.email,
            body.password,
            body.remember_me,
        );

        if (error) {
            return res.status(400).json({
                message: error_message
            })
        }

        if (!auth) {
            return res.status(403).json({
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