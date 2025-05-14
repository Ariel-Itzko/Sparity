import { toast } from "sonner";

import useUserTokenStore from "../../../store/userToken.store.js";

import apiRequest from "../../api_request_handler";

export const updateUserRespApi = async (post_id, status, update_user_id) => {
    let { userToken } = useUserTokenStore.getState();
    let data = {
        post_id,
        status,
        update_user_id,
    }

    try {
        const response = await apiRequest({
            url: `/post/post_resp/update_resp`,
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