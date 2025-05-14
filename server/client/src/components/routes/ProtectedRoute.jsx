import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ isAuth }) {
    if (isAuth) return <Outlet />
    return <Navigate to={'/login'} />
}
