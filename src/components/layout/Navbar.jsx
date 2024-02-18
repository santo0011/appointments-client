import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = ({ onMessage }) => {
    const navigate = useNavigate();

    const { userUnseenNotifications, userSeenNotifications } = useSelector(state => state.user);
    const { unseenNotifications, seenNotifications } = useSelector(state => state.admin);
    const { userInfo } = useSelector((state) => state.auth);
    const { id, email, isAdmin, name, isDoctor } = userInfo;

    // onChangeSearch
    const onChangeSearch = (e) => {
        onMessage(e.target.value)
    }

    return (
        <>
            <nav className="navbar navbar-header navbar-expand-lg" data-background-color="purple2">
                <div className="container-fluid">
                    <div className="collapse" id="search-nav">
                        <form className="navbar-left navbar-form nav-search mr-md-3">
                            <div className="input-group mx-5">
                                <div className="input-group-prepend">
                                    <button type="submit" className="btn btn-search pr-1">
                                        <i className="fa fa-search search-icon text-danger" />
                                    </button>
                                </div>
                                <input type="text" onChange={onChangeSearch} placeholder="Search ..." className="form-control" />
                            </div>
                        </form>
                    </div>
                    <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
                        <li className="nav-item toggle-nav-search hidden-caret">
                            <a className="nav-link" data-toggle="collapse" href="#search-nav" role="button" aria-expanded="false" aria-controls="search-nav">
                                <i className="fa fa-search" />
                            </a>
                        </li>
                        <li>

                        </li>

                        <li className="nav-item dropdown hidden-caret">
                            <Link className="nav-link dropdown-toggle" to={isAdmin ? '/admin-notifications' : isDoctor ? '/doctor-notifications' : '/user-notifications'} id="notifDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-bell" />
                                {isAdmin ?
                                    (unseenNotifications?.length ? <span className="notification">{unseenNotifications.length}</span> : null) :
                                    (userUnseenNotifications?.length ? <span className="notification">{userUnseenNotifications.length}</span> : null)
                                }
                            </Link>
                        </li>


                        <li className="nav-item dropdown hidden-caret">
                            <a className="dropdown-toggle profile-pic" data-toggle="dropdown" href="#" aria-expanded="false">
                                <div className="avatar-sm">
                                    <img src="../assets/img/profile.jpg" alt="..." className="avatar-img rounded-circle" />
                                </div>
                            </a>

                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}


Navbar.defaultProps = {
    onMessage: () => {

    }
}

export default Navbar;
