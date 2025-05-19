import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

const userRoleStore = (set) => ({
    userRole: 'Advertiser',
    setUserRole: (userRole) => set({ userRole: userRole }),
    removeUserRole: () => set({ userRole: 'Advertiser' })
})

const useUserRoleStore = create(
    devtools(
        persist(userRoleStore, {
            name: 'user-role'
        })
    )
)

export default useUserRoleStore;