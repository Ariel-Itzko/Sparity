import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

const userProfileStore = (set) => ({
    userProfile: null,
    setUserProfile: (profileData) => set({ userProfile: profileData }),
    removeProfile: () => set({ userProfile: null })
})

const useUserProfileStore = create(
    devtools(
        persist(userProfileStore, {
            name: 'user-profile'
        })
    )
);

export default useUserProfileStore;
