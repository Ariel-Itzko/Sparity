import { useMemo } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

// ROUTES CHECKER
import PreAuthRoute from './components/routes/PreAuthRoute';
import ProtectedRoute from './components/routes/ProtectedRoute';

// STORES
import useUserProfileStore from './store/userProfile.store';
import useUserStore from './store/user.store';
import useUserTokenStore from './store/userToken.store';

// LAYOUTS
import MainLayout from './components/layout/mainLayout/MainLayout';

// PAGES
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import FirstAuth from './components/common/FirstAuth';
import LandingPage from './pages/Landing/LandingPage';
import Test from './pages/test/Test';
import useUserRoleStore from './store/userRole.store';

export default function AppRoute() {
    const { user } = useUserStore();
    const { userProfile } = useUserProfileStore();
    const { userToken } = useUserTokenStore();
    const { userRole } = useUserRoleStore();

    const isAuth = useMemo(() => Boolean(user && userToken && userProfile), [userProfile, userProfile, user]);
    const isFirstAuth = useMemo(() => Boolean(!userProfile?.is_demographic_updated), [userProfile]);
    const isCreator = useMemo(() => Boolean(userRole === 'Creator'), [userProfile]);

    return (
        <Routes>
            {isCreator ?
                <Route path='/' element={<h1>this is creator pages</h1>} />
                :
                <>
                    <Route path='/' element={<MainLayout />}>
                        <Route element={<FirstAuth isFirstAuth={isFirstAuth} isAuth={isAuth} />}>

                            <Route index element={<LandingPage />} />

                            <Route element={<ProtectedRoute isAuth={isAuth} />}>
                                <Route path='/hello' element={<p>Hello world</p>} />

                            </Route>
                        </Route>
                    </Route>
                    <Route element={<ProtectedRoute isAuth={isAuth} />}>
                        {/* <Route path='/room/:room_id?' element={<Room />} /> */}
                    </Route>
                </>
            }
            <Route element={<PreAuthRoute isAuth={isAuth} />}>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Route>
            <Route path='test' element={<Test />} />
        </Routes>
    );
}
