import addUserRespPostCtrl from "../../../controller/user/post/PostResp/addUserRespPost.ctrl.js";
import getPostRespCtrl from "../../../controller/user/post/PostResp/getPostResp.ctrl.js";
import getUserAllRespCtrl from "../../../controller/user/post/PostResp/getUserAllResp.ctrl.js";
import updateStatusPostRespCtrl from "../../../controller/user/post/PostResp/updateStatusPostResp.ctrl.js";

import register_route from "../../../util/reg_route.js";

const userPostRespRoute = (router) => {
    register_route({
        router,
        route: '/user/post_resp/addUser',
        user_auth: true,
        post_method: addUserRespPostCtrl,
    });
    register_route({
        router,
        route: '/user/post_resp/get/:post_id',
        user_auth_light: true,
        get_method: getPostRespCtrl
    });
    register_route({
        router,
        route: '/user/post_resp/user_app_resp',
        user_auth: true,
        post_method: getUserAllRespCtrl
    });
    register_route({
        router,
        route: '/post/post_resp/update_resp',
        user_auth: true,
        post_method: updateStatusPostRespCtrl
    })
};

export default userPostRespRoute;