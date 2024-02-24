import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import LogoBar from '../../components/layout/LogoBar';
import { useDispatch } from 'react-redux';


const AdminDashboard = () => {
    const dispatch = useDispatch();

    const [sideBar, setSideBar] = useState('')

    // handleSideBar
    const handleSideBar = (bar) => {
        setSideBar(bar)
    }

    return (
        <div className={`wrapper ${sideBar ? 'sidebar_minimize' : ''}`}>
        <div className="main-header">
            <LogoBar onIcon={handleSideBar} />
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