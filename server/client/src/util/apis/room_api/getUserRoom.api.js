import { toast } from "sonner";

import useUserTokenStore from "../../../store/userToken.store.js";
import apiRequest from "../../api_request_handler";



export const getUserRoom = async () => {
    try {
        let { userToken } = useUserTokenStore.getState();
        const response = await apiRequest({
            url: '/user/room/get_user_room',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        });

        return response;
    } catch (error) {
        toast.error(error.message);
    }
}