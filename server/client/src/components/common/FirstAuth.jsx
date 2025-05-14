import { useForm } from 'react-hook-form';
import { Outlet } from 'react-router-dom';
import { firstTImeAuthApi } from '../../util/apis/profile_api/user_firstauth.api';

export default function FirstAuth({ isFirstAuth, isAuth }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    if (!isFirstAuth || !isAuth) return <Outlet />;

    const onSubmit = async (data) => {
        await firstTImeAuthApi(data)
    };

    return (
        <>
            <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50">
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="text-xl font-semibold mb-4">Please fill in your information</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">Gender</h3>
                                <div className="flex gap-4">
                                    <label>
                                        <input
                                            type="radio"
                                            {...register('gender', { required: 'Gender is required' })}
                                            value="male"
                                            className="mr-2"
                                        />
                                        Male
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            {...register('gender', { required: 'Gender is required' })}
                                            value="female"
                                            className="mr-2"
                                        />
                                        Female
                                    </label>
                                </div>
                                {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
                            </div>

                            <div>
                                <label className="block font-semibold mb-2">Date of Birth</label>
                                <input
                                    type="date"
                                    {...register('date_of_birth', { required: 'Date of birth is required' })}
                                    className="input input-bordered w-full"
                                />
                                {errors.date_of_birth && <p className="text-red-500">{errors.date_of_birth.message}</p>}
                            </div>

                            <div>
                                <label className="block font-semibold mb-2">Country</label>
                                <input
                                    type="text"
                                    {...register('country', { required: 'Country is required' })}
                                    className="input input-bordered w-full"
                                />
                                {errors.country && <p className="text-red-500">{errors.country.message}</p>}
                            </div>

                            <div>
                                <label className="block font-semibold mb-2">City</label>
                                <input
                                    type="text"
                                    {...register('city', { required: 'City is required' })}
                                    className="input input-bordered w-full"
                                />
                                {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                            </div>

                            <div>
                                <label className="block font-semibold mb-2">User Preference</label>
                                <select
                                    {...register('user_prefer', { required: 'User preference is required' })}
                                    className="input input-bordered w-full"
                                >
                                    <option value="creator">Creator</option>
                                    <option value="collaborator">Collaborator</option>
                                </select>
                                {errors.user_prefer && <p className="text-red-500">{errors.user_prefer.message}</p>}
                            </div>

                            <button type="submit" className="btn btn-primary w-full">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
}
