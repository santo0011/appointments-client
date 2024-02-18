import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import LogoBar from '../../components/layout/LogoBar';


const AdminProfile = () => {
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
                        <h1>AdminProfile</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminProfile;