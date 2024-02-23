import React from 'react';
import { useSelector } from 'react-redux';

const LogoBar = () => {

    const { userInfo } = useSelector((state) => state.auth);
    const { id, email, isAdmin, name, isDoctor } = userInfo;


    return (
        <div className="logo-header " data-background-color="purple2">
            <a href="/profile" className="h5 text-white fw-bold my-auto text-decoration-none btn btn-secondary mx-1 logoBar">
                {isAdmin ? "ADMIN" : (isDoctor ? "DOCTOR" : "USER")}
            </a>
            <button className="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon">
                    <i className="icon-menu" />
                </span>
            </button>
            <button className="topbar-toggler more"><i className="icon-options-vertical" /></button>
            <div className="nav-toggle ml-5" style={{ zIndex: -1 }}>
                <button className="btn btn-toggle toggle-sidebar mx-4">
                    <i className="icon-menu" />
                </button>
            </div>
        </div>
    )
}


export default LogoBar;