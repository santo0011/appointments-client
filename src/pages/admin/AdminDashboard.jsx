import React, { useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import LogoBar from '../../components/layout/LogoBar';
import { useDispatch } from 'react-redux';


const AdminDashboard = () => {
    const dispatch = useDispatch();


    return (
        <div className="wrapper">
            <div className="main-header">
                <LogoBar />
                <Navbar />
            </div>
            <Sidebar />
            <div className="main-panel">
                <div className="content">
                    <div className="page-inner">
                        <h1>AdminDashboard</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AdminDashboard;