import { Outlet } from 'react-router-dom';
import Header from './mainLayoutComp/header/Header';
import Footer from './mainLayoutComp/footer/Footer';

export default function MainLayout() {
    return (
        <>
            <Header />
            <div className='min-h-screen'>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}
