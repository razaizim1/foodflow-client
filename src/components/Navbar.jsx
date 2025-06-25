import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import UseAuth from '../hooks/UseAuth';

const Navbar = () => {
    const { userInfo, logout, loading } = UseAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-dots loading-lg text-green-500"></span>
        </div>;
    }

    return (
        <header className="bg-white dark:bg-gray-900 shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-green-500 hover:text-green-600 transition">
                    <span className="text-gray-800 dark:text-white">Food</span>Flow
                </Link>


                {/* Desktop Menu */}
                <nav className="hidden lg:flex gap-6 text-gray-700 dark:text-gray-300 font-medium">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `hover:text-green-600 transition-colors duration-300 ${isActive ? "text-green-500" : ""}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/availablefoods"
                        className="hover:text-green-600 transition-colors duration-300"
                    >
                        Available Foods
                    </NavLink>
                    <NavLink
                        to="/addfood"
                        className="hover:text-green-600 transition-colors duration-300"
                    >
                        Add Food
                    </NavLink>
                    <NavLink
                        to="/myfoods"
                        className="hover:text-green-600 transition-colors duration-300"
                    >
                        Manage My Foods
                    </NavLink>
                    <NavLink
                        to="/myrequests"
                        className="hover:text-green-600 transition-colors duration-300"
                    >
                        My Food Request
                    </NavLink>
                </nav>


                {/* User / Auth */}
                <div className="flex items-center gap-4">
                    {userInfo ? (
                        <>
                            <div className="relative group">
                                <img
                                    src={userInfo.photoURL}
                                    alt="User"
                                    title={userInfo.displayName}
                                    className="w-10 h-10 rounded-full ring-2 ring-green-500 cursor-pointer"
                                />
                                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 opacity-0 group-hover:opacity-100 transition duration-300 w-max z-20">
                                    <p className="text-sm">{userInfo.displayName}</p>
                                    <button onClick={handleLogout} className="cursor-pointer text-red-500 hover:text-red-600 text-sm mt-1">Logout</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <NavLink to="/signup" className="btn btn-sm bg-green-500 text-white hover:bg-green-600">Signup</NavLink>
                            <NavLink to="/login" className="btn btn-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">Login</NavLink>
                        </>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className="lg:hidden dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-3 shadow bg-white dark:bg-gray-800 rounded-box w-52 text-sm">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/available-foods">Available Foods</NavLink></li>
                        <li><NavLink to="/addfood">Add Food</NavLink></li>
                        <li><NavLink to="/manage-foods">Manage My Foods</NavLink></li>
                        <li><NavLink to="/my-requests">My Food Request</NavLink></li>
                        {!userInfo && <>
                            <li><NavLink to="/signup">Signup</NavLink></li>
                            <li><NavLink to="/login">Login</NavLink></li>
                        </>}
                        {userInfo && <li className='cursor-pointer'><button onClick={handleLogout}>Logout</button></li>}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
