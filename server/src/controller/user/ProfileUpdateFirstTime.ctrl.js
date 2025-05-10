import _ from 'lodash';

import { ProfileUpdateFirstTimeService } from '../../service/user/user_profile.service.js';
import { CHECK_REQUIRED_PARAMS, RENDER_BAD_REQUEST } from '../../util/utils.js';

export const ProfileUpdateFirstTimeCtrl = async (req, res) => {
    try {

        const all_params = [
            'gender',
            'date_of_birth',
            'country',
            'user_prefer',
            'city',
        ];
        const body = _.pick(req.body, all_params);

        const { is_missing, missing_key } = CHECK_REQUIRED_PARAMS(body, all_params);
        if (is_missing) {
            return res.status(400).json({
                message: 'request params missing => ' + missing_key
            });
        }

        const { error, error_message, data } = await ProfileUpdateFirstTimeService(
            req.user,
            body.gender,
            body.date_of_birth,
            body.country,
            body.user_prefer,
            body.city,
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