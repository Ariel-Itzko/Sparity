import { toast } from "sonner";


import useUserTokenStore from "../../../store/userToken.store.js";
import apiRequest from "../../api_request_handler";


let { userToken } = useUserTokenStore.getState();


export const createPofileApi = async (data) => {
    try {
        const response = await apiRequest({
            url: '/user/post/create',
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        });

        toast.success('Post created Successfully!');
        return response;
    } catch (error) {
        toast.error(error.message);
    }
}