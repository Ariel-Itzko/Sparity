import jwt from 'jsonwebtoken';
import { getUserWithToken } from '../service/user/user_auth.service.js';

const user_auth_middleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(403).json({
                error: 'No credentials sent!'
            })
        };

        const bearerHeader = req.headers['authorization'];
        const bearer = bearerHeader.split(' ');
        const jwt_token = bearer[1];

        jwt.verify(jwt_token, process.env.JWT_SECRET, async (error, payload) => {
            if (error) {
                return res.status(401).send();
            } else {
                const token = payload.auth_token;
                const member_id = payload.member_id;
                req.token = token;


                const { auth_failed, user } = await getUserWithToken(token, member_id);

                if (auth_failed) {
                    return res.status(401).send();
                } else {
                    req.user = user;
                    next();
                }
            }
        })

    } catch (error) {
        return res.status(401).send();
    }
};


export default user_auth_middleware;