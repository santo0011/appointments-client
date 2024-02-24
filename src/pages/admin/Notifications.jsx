import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import LogoBar from '../../components/layout/LogoBar';
import { useDispatch, useSelector } from 'react-redux';
import { delete_all_seen_notification, get_notifications, mark_all_as_seen, messageClear } from '../../store/Reducers/adminReducer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { delete_all_user_seen_notification, get_user_notifications, user_mark_all_as_seen } from '../../store/Reducers/userReducer';


const Notifications = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userUnseenNotifications, userSeenNotifications, userSuccess } = useSelector(state => state.user);
    const { unseenNotifications, loader, seenNotifications, successMessage, errorMessage } = useSelector(state => state.admin);
    const { userInfo } = useSelector((state) => state.auth);
    const { id, email, isAdmin, name } = userInfo;

    const [sideBar, setSideBar] = useState('')

    // handleSideBar
    const handleSideBar = (bar) => {
        setSideBar(bar)
    }


    // markAllSeen
    const markAllSeen = () => {
        if (isAdmin) {
            if (unseenNotifications.length > 0) {
                dispatch(mark_all_as_seen())
            } else {
                toast.error("Unseen notification is empty !")
            }
        } else {
            if (userUnseenNotifications.length > 0) {
                dispatch(user_mark_all_as_seen(id))
            } else {
                toast.error("Unseen notification is empty !")
            }
        }

    }


    // deleteAllSeenNotification
    const deleteAllSeenNotification = () => {
        if (isAdmin) {
            if (seenNotifications.length > 0) {
                dispatch(delete_all_seen_notification())
            } else {
                toast.error("Seen notification is empty !")
            }
        } else {
            if (userSeenNotifications.length > 0) {
                dispatch(delete_all_user_seen_notification(id))
            } else {
                toast.error("Seen notification is empty !")
            }
        }
    }


    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            dispatch(get_notifications())
        }
        if (userSuccess) {
            toast.success(userSuccess)
            dispatch(messageClear())
            dispatch(get_user_notifications())
        }
    }, [successMessage, errorMessage, userSuccess])


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

                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title bold-text">Notifications</div>
                                    </div>
                                    <div className="card-body">
                                        <ul className="nav nav-pills nav-secondary" id="pills-tab" role="tablist">
                                            <li className="nav-item submenu">
                                                <a className="nav-link active show" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="false">Unseen</a>
                                            </li>
                                            <li className="nav-item submenu">
                                                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="true">Seen</a>
                                            </li>

                                        </ul>
                                        <div className="tab-content mt-2 mb-3" id="pills-tabContent">
                                            <div className="tab-pane fade active show" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                                                <div onClick={() => markAllSeen()} style={{ textAlign: "right", fontWeight: "bold", textDecoration: "underline", cursor: 'pointer' }}>
                                                    <p>Mark all as seen</p>
                                                </div>

                                                <div style={{ height: "400px", overflowY: "auto" }}>

                                                    {isAdmin ?
                                                        (unseenNotifications?.map(notification => (
                                                            <div key={notification.id} className={`alert-${notification.message.includes('rejecte') || notification.message.includes('cancle') || notification.message.includes('block') ? 'danger' : 'success'} my-2 py-3 px-3 rounded`} style={{ cursor: 'pointer' }} >
                                                                <span className="">{notification.message} !</span>
                                                            </div>
                                                        ))) :
                                                        (userUnseenNotifications.map(notification => (
                                                            <div key={notification._id} className={`alert-${notification.message.includes('rejecte') || notification.message.includes('cancle') || notification.message.includes('block') ? 'danger' : 'success'} my-2 py-3 px-3 rounded`} style={{ cursor: 'pointer' }} >
                                                                <span className="">{notification.message} !</span>
                                                            </div>
                                                        )))
                                                    }

                                                </div>


                                            </div>
                                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

                                                <div onClick={() => deleteAllSeenNotification()} style={{ textAlign: "right", fontWeight: "bold", textDecoration: "underline", cursor: 'pointer' }}>
                                                    <p>Delete all</p>
                                                </div>

                                                <div style={{ height: "400px", overflowY: "auto" }}>

                                                    {isAdmin ?
                                                        (seenNotifications?.map(notification => (
                                                            <div key={notification.id} className={`alert-${notification.message.includes('rejecte') || notification.message.includes('cancle') || notification.message.includes('block') ? 'danger' : 'success'} my-2 py-3 px-3 rounded`} style={{ cursor: 'pointer' }} >
                                                                <span className=''>{notification.message} !</span>
                                                            </div>
                                                        ))) :
                                                        (userSeenNotifications.map(notification => (
                                                            <div key={notification.id} className={`alert-${notification.message.includes('rejecte') || notification.message.includes('cancle') || notification.message.includes('block') ? 'danger' : 'success'} my-2 py-3 px-3 rounded`} style={{ cursor: 'pointer' }} >
                                                                <span className=''>{notification.message} !</span>
                                                            </div>
                                                        )))
                                                    }

                                                </div>


                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notifications;