import { useMemo } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

// ROUTES CHECKER
import PreAuthRoute from './components/routes/PreAuthRoute';
import ProtectedRoute from './components/routes/ProtectedRoute';

// PAGES
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';

// STORES
import useUserProfileStore from './store/userProfile.store';
import useUserStore from './store/user.store';
import useUserTokenStore from './store/userToken.store';
import MainLayout from './components/layout/mainLayout/MainLayout';
import FirstAuth from './components/common/FirstAuth';

// LAYOUTS

export default function AppRoute() {
    const { user } = useUserStore();
    const { userProfile } = useUserProfileStore();
    const { userToken } = useUserTokenStore();

    const isAuth = useMemo(() => Boolean(user && userToken && userProfile), [userProfile, userProfile, user]);
    const isFirstAuth = useMemo(() => Boolean(!userProfile?.is_demographic_updated), [userProfile]);


    console.log(userProfile);
    console.log(isFirstAuth);
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route element={<FirstAuth isFirstAuth={isFirstAuth} isAuth={isAuth} />}>

                    <Route index element={<h1>Hello</h1>} />

                    <Route element={<ProtectedRoute isAuth={isAuth} />}>
                        <Route path='/hello' element={<p>Hello world</p>} />
                    </Route>
                </Route>
            </Route>
            <Route element={<PreAuthRoute isAuth={isAuth} />}>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Route>
        </Routes>
    );
}
