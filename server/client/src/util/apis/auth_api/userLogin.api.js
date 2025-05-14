import { toast } from "sonner";


import useUserStore from "../../../store/user.store.js";
import useUserTokenStore from "../../../store/userToken.store.js";
import useUserProfile from "../../../store/userProfile.store.js";
import apiRequest from "../../api_request_handler";

let setUser = useUserStore.getState().setUser;
let setUserToken = useUserTokenStore.getState().setUserToken;
let { setUserProfile } = useUserProfile.getState();


export const loginApi = async (data) => {
    try {
        const response = await apiRequest({
            url: '/user/auth/login',
            method: 'POST',
            data
        });

        setUser(response.data.user);
        setUserToken(response.data.auth_token);
        setUserProfile(response.data.profile)

        toast.success("Login successful!");
        
        return response;
    } catch (error) {
        toast.error(error.message);
    }
}