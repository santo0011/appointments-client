import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div className="vh-100 d-flex align-items-center justify-content-center">
            <h2>Unauthorized Access !!! You do not have permission to view this page.</h2>
        </div>
    );
};


const AdminProtectRoute = () => {
    const { userInfo } = useSelector(state => state.auth);

    if (!userInfo) {
        return <Navigate to="/login" />;
    } else {
        if (userInfo.isAdmin) {
            return <Outlet />;
        } else {
            return <Unauthorized />;
        }
    }

}

export default AdminProtectRoute;