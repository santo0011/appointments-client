import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);
    const { id, email, isAdmin, name, isDoctor } = userInfo;

    // console.log(id, email, isAdmin, name)

    // logoutFunction
    const logoutFunction = async () => {
        try {
            localStorage.removeItem("user_info");
            localStorage.removeItem("user_token");
            toast.success("Logout success");
            navigate('/login')
        } catch (error) {
            console.error("Error during logout:", error);
            toast.error("Logout failed");
        }
    };

    // userRouter
    const userRouter = [
        {
            name: "Home",
            path: "/",
            icon: "fas fa-home",
        },
        {
            name: "Appointments",
            path: "/book-appointments",
            icon: "fas fa-calendar-alt",
        },
        {
            name: "Apply Doctor",
            path: "/apply-doctor",
            icon: "fas fa-address-book",
        }
    ];

    // doctorRouter
    const doctorRouter = [
        {
            name: "Home",
            path: "/doctor",
            icon: "fas fa-home",
        },
        // {
        //     name: "Appointments",
        //     path: "/book-appointments/",
        //     icon: "fas fa-calendar-alt",
        // },
        {
            name: "Profile",
            path: "/doctor-profile",
            icon: "fas fa-user",
        },
    ];

    // adminRouter
    const adminRouter = [
        {
            name: "Home",
            path: "/admin",
            icon: "fas fa-home",
        },
        {
            name: "Users",
            path: "/admin-users",
            icon: "fas fa-user-friends",
        },
        {
            name: "Doctors",
            path: "/admin-doctors",
            icon: "fas fa-address-book",
        },
        {
            name: "Profile",
            path: "/admin-profile",
            icon: "fas fa-user",
        },
    ];

    const routes = isAdmin === true ? adminRouter : isDoctor === true ? doctorRouter : userRouter;

    return (
        <div className="sidebar sidebar-style-2">
            <div className="sidebar-wrapper scrollbar scrollbar-inner">
                <div className="sidebar-content">
                    <ul className="nav nav-primary mt-5">
                        {routes?.map((data) => (
                            <li
                                className={`nav-item ${location?.pathname === data.path ? "active" : ""
                                    }`}
                                key={data.path}
                            >
                                <Link to={data.path}>
                                    <i className={data.icon} />
                                    <p>{data.name}</p>
                                </Link>
                            </li>
                        ))}
                        <li className="nav-item" style={{ cursor: "pointer" }}>
                            <a onClick={logoutFunction}>
                                <i className="fas fa-sign-out-alt" />
                                <p>Logout</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};



export default Sidebar;
