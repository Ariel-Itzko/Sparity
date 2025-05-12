import { ProfileUpdateFirstTimeCtrl } from "../../../controller/user/profile/ProfileUpdateFirstTime.ctrl.js"
import register_route from "../../../util/reg_route.js"

const UserProfileRoute = (router) => {
    register_route({
        router,
        route: '/user/prfile/updateFirstTime',
        user_auth: true,
        post_method: ProfileUpdateFirstTimeCtrl

    })
}

export default UserProfileRoute;