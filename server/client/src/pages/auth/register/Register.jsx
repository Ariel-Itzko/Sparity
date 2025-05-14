import { useForm } from 'react-hook-form';
import { Mail, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RegisterApi } from '../../../util/apis/auth_api/userRegister.api';

export default function Register() {
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        let resp = await RegisterApi(data);
        if (resp) {
            window.location.reload();
        }
    };

    const password = watch('password');

    return (
        <section className="flex items-center justify-center min-h-screen px-4 py-8">
            <div className="rounded-md p-6 shadow-lg w-full max-w-md bg-base-100">
                <div className="text-center mb-4">
                    <h1 className="text-xl font-bold">Sparity</h1>
                    <p className="text-xs text-gray-500">Create a new account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
                        <div className="flex-1">
                            <label className="input input-bordered flex items-center gap-2 w-full">
                                <User className="w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="grow"
                                    {...register('first_name', { required: 'First name is required' })}
                                />
                            </label>
                            {errors.first_name && (
                                <p className="text-red-500 text-sm">{errors.first_name.message}</p>
                            )}
                        </div>

                        <div className="flex-1">
                            <label className="input input-bordered flex items-center gap-2 w-full">
                                <User className="w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="grow"
                                    {...register('last_name', { required: 'Last name is required' })}
                                />
                            </label>
                            {errors.last_name && (
                                <p className="text-red-500 text-sm">{errors.last_name.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="input input-bordered flex items-center gap-2 w-full">
                            <Mail className="w-4 h-4" />
                            <input
                                type="email"
                                placeholder="Email"
                                className="grow"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                        message: 'Invalid email address',
                                    },
                                })}
                            />
                        </label>
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
                        <div className="flex-1">
                            <label className="input input-bordered flex items-center gap-2 w-full">
                                <Lock className="w-4 h-4" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="grow"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters',
                                        },
                                    })}
                                />
                            </label>
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex-1">
                            <label className="input input-bordered flex items-center gap-2 w-full">
                                <Lock className="w-4 h-4" />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="grow"
                                    {...register('confirm_password', {
                                        required: 'Please confirm your password',
                                        validate: (value) =>
                                            value === password || 'Passwords do not match',
                                    })}
                                />
                            </label>
                            {errors.confirm_password && (
                                <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>
                            )}
                        </div>
                    </div>

                    <label className="label cursor-pointer flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-xs"
                            {...register('remember_me')}
                        />
                        <span className="label-text">Remember Me</span>
                    </label>

                    <button type="submit" className="btn btn-primary w-full">
                        Register
                    </button>

                    <p className="text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary underline">
                            Login here
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
}
