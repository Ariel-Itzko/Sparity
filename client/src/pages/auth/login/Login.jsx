import { useForm } from 'react-hook-form';
import { Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loginApi } from '../../../util/apis/auth_api/userLogin.api';

export default function Login() {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        let resp = await loginApi(data);
        if (resp) {
            window.location.reload()
        }
    };

    return (
        <section className="flex items-center justify-center h-screen flex-col">
            <div className="rounded-md p-6 shadow-lg w-full max-w-md bg-base-100">
                <div className="text-center mb-4">
                    <h1 className="text-xl font-bold">Sparity</h1>
                    <p className="text-xs text-gray-500">Login into your account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
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

                    <label className="label cursor-pointer flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-xs"
                            {...register('remember_me')}
                        />
                        <span className="label-text">Remember Me</span>
                    </label>

                    <button type="submit" className="btn btn-primary w-full">
                        Login
                    </button>

                    <p className="text-center text-sm text-gray-500">
                        Don&apos;t have an account?{' '}
                        <Link to="/register" className="text-primary underline">
                            Register here
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
}
