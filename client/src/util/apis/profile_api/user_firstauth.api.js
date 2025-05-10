import { toast } from "sonner";


import useUserStore from "../../../store/user.store.js";
import useUserTokenStore from "../../../store/userToken.store.js";
import useUserProfile from "../../../store/userProfile.store.js";
import apiRequest from "../../api_request_handler";


let { userToken } = useUserTokenStore.getState();
let { setUserProfile } = useUserProfile.getState();


export const firstTImeAuthApi = async (data) => {
    try {
        const response = await apiRequest({
            url: '/user/prfile/updateFirstTime',
            method: 'POST',
            data,
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        });
        setUserProfile(response.data)
        toast.success("Welcome to Sparity");

        return response;
    } catch (error) {
        toast.error(error.message);
    }
}