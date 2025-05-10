import user_auth_light_middleware from '../middleware/user_auth_ligth_middleware.mid.js'
import user_auth_middleware from '../middleware/user_auth_middleware.mid.js';

import { HTTP_WRONG_METHOD } from "./wrong_method.js";

const register_route = (
    {
        router = undefined,
        route = undefined,
        // admin_auth = false,
        // admin_auth_light = false,
        user_auth = false,
        user_auth_light = false,
        get_method = undefined,
        post_method = undefined,
    } = {}) => {
    if (route !== undefined || router !== undefined) {
        let args = [route];
        // if (admin_auth_light) {

        // } else if (admin_auth) {

        // };

        if (user_auth_light) {
            args.push(user_auth_light_middleware)
        } else if (user_auth) {
            args.push(user_auth_middleware)
        };

        if (get_method) {
            router.get(...args, get_method);
        } else {
            router.get(...args, HTTP_WRONG_METHOD)
        };

        if (post_method) {
            router.post(...args, post_method);

        } else {
            router.post(...args,)
        }
    }

};


export default register_route;