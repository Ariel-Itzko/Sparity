import { toast } from "sonner";

import useUserTokenStore from "../../../store/userToken.store.js";

import apiRequest from "../../api_request_handler";

export const getPostByIdApi = async (post_id) => {
    let { userToken } = useUserTokenStore.getState();
    try {
        const response = await apiRequest({
            url: `/user/post/get/${post_id}`,
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