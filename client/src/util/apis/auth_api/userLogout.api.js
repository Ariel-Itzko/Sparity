import { toast } from "sonner";


import useUserStore from "../../../store/user.store.js";
import useUserTokenStore from "../../../store/userToken.store.js";
import useUserProfile from "../../../store/userProfile.store.js";
import apiRequest from "../../api_request_handler";

let { removeUser } = useUserStore.getState();
let { removeUserToken, userToken } = useUserTokenStore.getState();
let { removeProfile } = useUserProfile.getState();


export const LogoutApi = async () => {
    try {
        const response = await apiRequest({
            url: '/user/auth/logout',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        });

        removeUser();
        removeProfile();
        removeUserToken()

        toast.success("Logut successful!");

        return response;
    } catch (error) {
        toast.error(error.message);
    }
}