import { useMemo } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

// ROUTES CHECKER
import PreAuthRoute from './components/routes/PreAuthRoute';
import ProtectedRoute from './components/routes/ProtectedRoute';

// PAGES
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import Post from './pages/post/Post';

// STORES
import useUserProfileStore from './store/userProfile.store';
import useUserStore from './store/user.store';
import useUserTokenStore from './store/userToken.store';

// LAYOUTS
import MainLayout from './components/layout/mainLayout/MainLayout';
import FirstAuth from './components/common/FirstAuth';
import AddPost from './pages/add_post/AddPost';
import MyPost from './pages/my_post/MyPost';
import MyPostDeatail from './pages/myPostDeatail/MyPostDeatail';

export default function AppRoute() {
    const { user } = useUserStore();
    const { userProfile } = useUserProfileStore();
    const { userToken } = useUserTokenStore();

    const isAuth = useMemo(() => Boolean(user && userToken && userProfile), [userProfile, userProfile, user]);
    const isFirstAuth = useMemo(() => Boolean(!userProfile?.is_demographic_updated), [userProfile]);


    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route element={<FirstAuth isFirstAuth={isFirstAuth} isAuth={isAuth} />}>

                    <Route index element={<h1>Hello</h1>} />

                    <Route element={<ProtectedRoute isAuth={isAuth} />}>
                        <Route path='/hello' element={<p>Hello world</p>} />
                        <Route path='/post' element={<Post />} />
                        <Route path='/post/new' element={<AddPost />} />
                        <Route path='/post/my-post' element={<MyPost />} />
                        <Route path='/post/my-post/:post_id' element={<MyPostDeatail />} />
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
