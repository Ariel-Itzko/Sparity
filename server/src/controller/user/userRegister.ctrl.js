import _ from 'lodash';

import { registerUser } from '../../service/user/user_auth.service.js';
import { CHECK_REQUIRED_PARAMS, RENDER_BAD_REQUEST } from '../../util/utils.js';

export const userRegisterCtrl = async (req, res) => {
    try {

        const all_params = [
            'email',
            'first_name',
            'last_name',
            'password',
            'remember_me'
        ];
        const body = _.pick(req.body, all_params);

        const { is_missing, missing_key } = CHECK_REQUIRED_PARAMS
            (body, all_params);
        if (is_missing) {
            return res.status(400).json({
                message: 'request params missing => ' + missing_key
            });
        }

        const { error, error_message, data } = await registerUser(
            body.email,
            body.first_name,
            body.last_name,
            body.password,
            body.remember_me,
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