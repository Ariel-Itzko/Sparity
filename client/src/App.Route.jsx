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

// LAYOUTS


export default function AppRoute() {
    const { user } = useUserStore();
    const { userProfile } = useUserProfileStore();
    const { userToken } = useUserTokenStore();

    const isAuth = useMemo(() => Boolean(user && userToken && userProfile), [userProfile, userProfile, user]);
    const isFirstAuth = useMemo(() => Boolean(!userProfile?.is_demographic_updated), [userProfile]);

    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route index element={<h1>Hello</h1>} />
            </Route>

            <Route element={<PreAuthRoute isAuth={isAuth} />} >
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Route>

            <Route element={<ProtectedRoute isAuth={isAuth} />}>
                <Route path='/hello' element={<p>Hello wolrd</p>} />
            </Route>
        </Routes>
    )
}
