import { Navigate, Outlet } from 'react-router-dom';

export default function PreAuthRoute({ isAuth }) {
    if (isAuth) return <Navigate to={'/'} />
    return <Outlet />
}
