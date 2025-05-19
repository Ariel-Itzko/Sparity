import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Bell as BellIcon,
} from 'lucide-react';

import Logo from './headerComp/Logo';
import { LogoutApi } from '../../../../../util/apis/auth_api/userLogout.api';
import useUserRoleStore from '../../../../../store/userRole.store';
import useUserStore from '../../../../../store/user.store';
import Search from './headerComp/Search';

export default function Header() {
    const { user } = useUserStore();
    const { userRole, setUserRole } = useUserRoleStore();

    const navigate = useNavigate();

    const [scrollToggle, setScrollToggle] = useState(false);
    const [menuToggle, setMenuToggle] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setScrollToggle(scrollPosition >= 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuToggle ? 'hidden' : 'auto';
    }, [menuToggle]);

    const HandleLogout = async () => {
        const resp = await LogoutApi();
        if (resp) window.location.reload();
    };

    const HandleSwitchUser = () => {
        setUserRole('Creator');
    };

    const HandleMenuToggler = () => {
        setMenuToggle(prev => !prev);
    };

    return (
        <>
            {menuToggle && (
                <div
                    className="fixed inset-0 bg-black opacity-40 z-30"
                    onClick={HandleMenuToggler}
                ></div>
            )}

            <div
                className={`fixed top-0 left-0 h-screen w-80 z-30 bg-base-200 shadow-lg transform transition-transform duration-300 ease-in-out ${menuToggle ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex justify-end p-4">
                    <button onClick={HandleMenuToggler} className="btn btn-sm btn-circle">✕</button>
                </div>
                <ul className="flex flex-col items-start px-6 py-4 space-y-4">
                    <li>
                        <button onClick={HandleSwitchUser} className="btn btn-ghost text-sm">
                            Switch to Creator
                        </button>
                    </li>
                    <li>
                        <Link to="/profile" onClick={HandleMenuToggler}>Profile</Link>
                    </li>
                    <li>
                        <Link to="/dashboard" onClick={HandleMenuToggler}>Dashboard</Link>
                    </li>
                    <li>
                        <button onClick={HandleLogout} className="btn btn-error btn-sm">Logout</button>
                    </li>
                    <div className='flex '>
                        <Search />
                    </div>
                </ul>
            </div>

            <div
                className={`px-9 navbar bg-base-100 flex flex-col shadow-sm transition-all duration-150 sticky top-0 z-10 ${scrollToggle ? 'py-4' : 'py-6'
                    }`}
            >
                <div className="flex justify-between w-full gap-x-4">
                    <div className="flex items-center sm:hidden cursor-pointer z-50">
                        <MenuIcon onClick={HandleMenuToggler} />
                    </div>

                    <Link to="/" className="flex items-center">
                        <Logo />
                    </Link>

                    <div className="md:flex items-center w-96 hidden">
                        <Search />
                    </div>

                    <div className="flex items-center gap-3">
                        <div>
                            <BellIcon className="w-10 cursor-pointer" />
                        </div>
                        <div className="hidden md:block">
                            <button
                                onClick={HandleSwitchUser}
                                className="btn btn-ghost text-sm text-purple-500"
                            >
                                Switch to Creator
                            </button>
                        </div>

                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img src="/logo-icon.png" alt="userProfileImage" />
                                </div>
                            </div>

                            <ul
                                tabIndex={0}
                                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 w-52"
                            >
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <hr className="my-3 px-[5px]" />
                                <li>
                                    <Link to="/settings">Settings</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="hidden sm:flex md:hidden items-center w-full mt-3">
                    <Search />
                </div>
            </div>
        </>
    );
}
