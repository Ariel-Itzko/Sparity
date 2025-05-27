import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Outlet } from 'react-router-dom';
import { firstTImeAuthApi } from '../../util/apis/profile_api/user_firstauth.api';
import useUserProfileStore from '../../store/userProfile.store';
import UserNameSet from './firstAuthComp/UserNameSet';
import DemoData from './firstAuthComp/DemoData';

export default function FirstAuth({ isFirstAuth, isAuth }) {
    const { userProfile } = useUserProfileStore();

    const IsUserNameSet = useMemo(() => Boolean(userProfile?.is_user_name_set), [userProfile])

    console.log(IsUserNameSet);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (isFirstAuth && isAuth) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isFirstAuth, isAuth]);

    if (!isFirstAuth || !isAuth) return <Outlet />;

    const onSubmit = async (data) => {
        await firstTImeAuthApi(data);
    };

    return (
        <>
            <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50">
                <div className='bg-base-100 w-full p-10 h-screen absolute overflow-y-auto'>
                    {
                        IsUserNameSet ?
                            <DemoData />
                            :
                            <UserNameSet />
                    }
                </div>
            </div>

            <Outlet />
        </>
    );
}
