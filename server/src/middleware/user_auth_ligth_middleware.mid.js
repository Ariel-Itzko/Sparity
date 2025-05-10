import jwt from 'jsonwebtoken';

const user_auth_light_middleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(403).json({
                error: 'No Credential send!'
            });
        }

        const bearerHeader = req.headers['authorization'];
        const bearer = bearerHeader.split(' ');
        const jwt_token = bearer[1];

        jwt.verify(jwt_token, process.env.JWT_SECERT, async (error, payload) => {
            if (error) {
                return res.status(401).send();
            } else {
                req.user = undefined;
                next();
            }
        })
    } catch (error) {
        return res.status(401).send();
    }
};

export default user_auth_light_middleware;