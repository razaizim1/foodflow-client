import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import UseAuth from '../../hooks/UseAuth';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const { signInWithGoogle, signInUser, userInfo } = UseAuth();

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(() => {
                toast.success('Logged in with Google Successfully');
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

        // handle login
    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then(() => {
                toast.success('User Logged In Successfully');
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error(error.message);
                console.log(error);
            });
    };

    // Redirect if already logged in
    if (userInfo) {
        return <Navigate to={from} replace />;
    }

    return (
        <div>
            <div className='flex items-center justify-center py-20'>
                <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
                    <h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
                    <p className="text-sm text-center dark:text-gray-600">Don't have account?
                        <Link to="/signup" rel="noopener noreferrer" className="focus:underline hover:underline">Signup here</Link>
                    </p>
                    {/* Google Login Button */}
                    <div className="my-6 space-y-4">
                        <button onClick={handleGoogleLogin}
                            aria-label="Login with Google"
                            type="submit"
                            className="flex cursor-pointer items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <p>Login with Google</p>
                        </button>
                        <div className="flex items-center w-full my-4">
                            <hr className="w-full dark:text-gray-600" />
                            <p className="px-3 dark:text-gray-600">OR</p>
                            <hr className="w-full dark:text-gray-600" />
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm">Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="example@email.com"
                                    className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <label htmlFor="password" className="text-sm">Password</label>
                                    <span
                                        className="text-xs hover:underline dark:text-gray-600 cursor-pointer"
                                    >
                                        Forgot password?
                                    </span>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="*****"
                                    className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full px-8 py-3 font-semibold rounded-md bg-[#4BAF47] text-white cursor-pointer"
                        >
                            Sign in
                        </button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Login;