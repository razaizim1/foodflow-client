import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import UseAuth from '../../hooks/UseAuth';
import { Link, Navigate } from 'react-router';

const Signup = () => {
    const { createUser, updateUserProfile, setUserInfo, userInfo } = UseAuth();
    const [showPass, setShowPass] = useState(false);

    // Handle createUser
    const handleSignup = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photoUrl = e.target.photoUrl.value;

        // Password Validation
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long.');
            return;
        }
        if (!uppercaseRegex.test(password)) {
            toast.error('Password must contain at least one uppercase letter.');
            return;
        }
        if (!lowercaseRegex.test(password)) {
            toast.error('Password must contain at least one lowercase letter.');
            return;
        }

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                console.log(user);
                updateUserProfile({ displayName: name, photoURL: photoUrl })
                    .then(() => {
                        setUserInfo({ ...user, displayName: name, photoURL: photoUrl });
                        toast.success('User Created and Profile Updated Successfully');
                    })
                    .catch((error) => {
                        console.log(error);
                        setUserInfo(user);
                    });
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                toast.error(errorMessage);
                // ..
            });
    };

    // Redirect if already logged in
    if (userInfo) {
        return <Navigate to="/" />;
    }

    return (
        <div className='flex items-center justify-center py-20'>
            <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
                <h2 className="mb-3 text-3xl font-semibold text-center">Sign Up</h2>
                <p className="text-sm text-center dark:text-gray-600">
                    Have an account?
                    <Link to="/login" rel="noopener noreferrer" className="focus:underline hover:underline"> Login Here</Link>
                </p>

                {/* Email and Password Form */}
                <form onSubmit={handleSignup} className="space-y-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm">Your Name</label>
                            <input type="text" name="name" id="name" placeholder="Your Name" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm">Email address</label>
                            <input type="email" name="email" id="email" placeholder="example@email.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="photoUrl" className="block text-sm">Photo Url</label>
                            <input type="text" name="photoUrl" id="photoUrl" placeholder="Photo Url" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm">Password</label>
                            <div className='relative'>
                                <input type={showPass ? 'text' : 'password'} name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" required />
                                <div onClick={() => { setShowPass(!showPass) }} className='absolute inset-y-0 right-3 flex items-center text-gray-500'>{showPass ? <FaEye /> : <FaEyeSlash />
                                }</div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-[#4BAF47] text-white cursor-pointer">Signup</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Signup;