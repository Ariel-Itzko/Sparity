import useUserTokenStore from "../../../store/userToken.store.js";
import useUserProfile from "../../../store/userProfile.store.js";

import apiRequest from "../../api_request_handler";

export const UserNameSetUpApi = async (data) => {
    let { userToken } = useUserTokenStore.getState();
    let { setUserProfile } = useUserProfile.getState();

    const response = await apiRequest({
        url: '/user/profile/update_username',
        method: 'POST',
        data,
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
    setUserProfile(response)
    return response;
}