import { toast } from "sonner";


import useUserTokenStore from "../../../store/userToken.store.js";
import apiRequest from "../../api_request_handler";


let { userToken } = useUserTokenStore.getState();


export const gatAllPostsApi = async () => {
    try {
        const response = await apiRequest({
            url: '/user/post/get_all_posts',
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