import addMessagesToRoom from "../../../controller/user/room/room_chat/addMessagesToRoom.ctrl.js";
import getMessagesByRoomCtrl from "../../../controller/user/room/room_chat/getMessagesByRoom.ctrl.js";
import getRoomMembersCtrl from "../../../controller/user/room/room_members/getRoomMembers.ctrl.js";

import register_route from "../../../util/reg_route.js";

const userRoomRoutes = (router) => {
    register_route({
        router,
        route: '/user/room/get_user_room',
        user_auth: true,
        get_method: getRoomMembersCtrl
    });

    register_route({
        router,
        route: '/user/room/chat/add',
        user_auth: true,
        post_method: addMessagesToRoom
    });
    register_route({
        router,
        route: '/user/room/chat/get/:room_id',
        user_auth: true,
        get_method: getMessagesByRoomCtrl
    });
}


export default userRoomRoutes;