import { toast } from "sonner";

import useUserTokenStore from "../../../store/userToken.store.js";

import apiRequest from "../../api_request_handler";

export const addRoomChatApi = async (data) => {
    let { userToken } = useUserTokenStore.getState();

    try {
        const response = await apiRequest({
            url: `/user/room/chat/add`,
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        });

        return response;
    } catch (error) {
        toast.error(error.message);
    }
}