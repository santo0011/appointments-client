import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const LogoBar = ({ onIcon }) => {

    const { userInfo } = useSelector((state) => state.auth);
    const { id, email, isAdmin, name, isDoctor } = userInfo;

    const [sideBar, setSideBar] = useState(false)

    // handleSideBar
    const handleSideBar = () => {
        setSideBar(!sideBar)
        onIcon(!sideBar)
    }

    return (
        <div className="logo-header " data-background-color="purple2">
            <a href="/profile" className="h5 text-white fw-bold my-auto text-decoration-none btn btn-secondary mx-1 logoBar">
                {isAdmin ? "ADMIN" : (isDoctor ? "DOCTOR" : "USER")}
            </a>
            <button onClick={handleSideBar} className="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon">
                    <i className="icon-menu" />
                </span>
            </button>
            <button className="topbar-toggler more"><i className="icon-options-vertical" /></button>
            <div className="nav-toggle ml-5" style={{ zIndex: -1 }}>
                <button onClick={handleSideBar} className="btn btn-toggle toggle-sidebar mx-4 ">
                    <i className="icon-menu" />
                </button>
            </div>
        </div>
    )
}

LogoBar.defaultProps = {
    onIcon: () => {

    }
}


export default LogoBar;