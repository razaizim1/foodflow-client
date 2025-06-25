import React from 'react';
import UseAuth from '../hooks/UseAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { userInfo, loading } = UseAuth();
    const location = useLocation();

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-dots loading-lg text-green-500"></span>
        </div>;
    }

    if (!userInfo) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children;
};

export default PrivateRoute;