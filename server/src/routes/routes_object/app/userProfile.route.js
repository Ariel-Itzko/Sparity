import { ProfileUpdateFirstTimeCtrl } from "../../../controller/user/profile/ProfileUpdateFirstTime.ctrl.js"
import ProfileUserNameUpdateCtrl from "../../../controller/user/profile/ProfileUserNameUpdate.ctrl.js";
import register_route from "../../../util/reg_route.js"

const UserProfileRoute = (router) => {
    register_route({
        router,
        route: '/user/prfile/updateFirstTime',
        user_auth: true,
        post_method: ProfileUpdateFirstTimeCtrl

    });
    register_route({
        router,
        route: '/user/profile/update_username',
        user_auth: true,
        post_method: ProfileUserNameUpdateCtrl 

    })
}

export default UserProfileRoute;