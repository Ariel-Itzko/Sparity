import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    Menu as MenuIcon,
    Search as SeacrhIcon,
    Bell as BellIcon

} from 'lucide-react'

import useUserStore from '../../../../../store/user.store'
import SBtn1 from '../../../../common/SBtn1';
import { LogoutApi } from '../../../../../util/apis/auth_api/userLogout.api';


export default function Header() {
    const { user } = useUserStore();

    const navigate = useNavigate();

    const [scrollToggle, setScrollToggle] = useState(false);
    const [isAuth, setIsAuth] = useState(Boolean(user));


    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            if (scrollPosition >= 20 && !scrollToggle) {
                setScrollToggle(true);
            } else if (scrollPosition <= 10 && scrollToggle) {
                setScrollToggle(false);
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [window.scrollY]);

    const HandleLogout = async () => {
        let resp = await LogoutApi();
        if (resp) {
            window.location.reload();
        }
    }

    return (
        <div className={`navbar bg-base-100 shadow-sm transition-all duration-150 sticky top-0 z-50 ${scrollToggle ? 'py-4' : 'py-6'}`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <MenuIcon />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white rounded-lg z-10 mt-3 w-56 p-4 shadow-lg space-y-3"
                    >
                        <li>
                            <Link to={'/post/new'}>
                                New Post
                            </Link>
                        </li>
                        <li>
                            <Link to={'/post/my-post'}>
                                My Posts
                            </Link>
                        </li>
                        {!isAuth ?
                            <>
                                <li>
                                    <SBtn1 label="Login" onClick={() => {
                                        navigate('/login')
                                    }} />
                                </li>
                                <li>
                                    <SBtn1 label="Register" onClick={() => {
                                        navigate('/register')
                                    }} />
                                </li>
                            </> :
                            <li>
                                <SBtn1 label='Logout' color='btn-error' onClick={HandleLogout} />
                            </li>
                        }
                    </ul>

                </div>
            </div>
            <div className="navbar-center">
                <Link to={'/'} className='text-xl'>Sparity</Link>
            </div>
            <div className="navbar-end">
                <button className='btn btn-ghost link link-hover link-primary'>
                    <Link to={'/post'}>Posts</Link>
                </button>
                <button className="btn btn-ghost btn-circle">
                    <SeacrhIcon />
                </button>
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <BellIcon />
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>
            </div>
        </div>
    )
}
