import createPostCtrl from "../../../controller/user/post/createPost.ctrl.js";
import getAllPostCtrl from "../../../controller/user/post/getAllPosts.ctrl.js";
import getPostByIdCtrl from "../../../controller/user/post/getPostById.ctrl.js";
import getUserPostsCtrl from "../../../controller/user/post/getUserPosts.ctrl.js";

import register_route from "../../../util/reg_route.js";

const userPostRoute = (router) => {
    register_route({
        router,
        route: '/user/post/create',
        user_auth: true,
        post_method: createPostCtrl
    });
    register_route({
        router,
        route: '/user/post/get/:postId',
        user_auth_light: true,
        get_method: getPostByIdCtrl
    });
    register_route({
        router,
        route: '/user/post/get_all_posts',
        get_method: getAllPostCtrl
    });
    register_route({
        router,
        route: '/user/post/get_user_post',
        user_auth: true,
        get_method: getUserPostsCtrl
    })

};


export default userPostRoute;