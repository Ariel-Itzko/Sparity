import { userLoginCtrl } from "../../../controller/user/auth/userLogin.ctrl.js";
import { userLogoutCtrl } from "../../../controller/user/auth/userLogout.ctrl.js";
import { userRegisterCtrl } from "../../../controller/user/auth/userRegister.ctrl.js";

import register_route from "../../../util/reg_route.js";

const UserAuhtRoute = (router) => {
    register_route({
        router,
        route: '/user/auth/login',
        post_method: userLoginCtrl
    });
    register_route({
        router,
        route: '/user/auth/register',
        post_method: userRegisterCtrl
    });
    register_route({
        router,
        route: '/user/auth/logout',
        user_auth: true,
        post_method: userLogoutCtrl
    })
};


export default UserAuhtRoute;