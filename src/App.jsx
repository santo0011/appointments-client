import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectRoute from './pages/auth/ProtectRoute';
import UserDashbaord from './pages/user/UserDashbaord';
import BookAppointments from './pages/user/BookAppointments';
import ApplyDoctor from './pages/user/ApplyDoctor';
import UserProfile from './pages/user/UserProfile';
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';
import AdminProfile from './pages/admin/AdminProfile';
import Notifications from './pages/admin/Notifications';
import { useDispatch } from 'react-redux';
import AdminProtectRoute from './pages/auth/AdminProtectRoute';
import { get_user_notifications } from './store/Reducers/userReducer';
import { get_notifications } from './store/Reducers/adminReducer';
import AdminDashboard from './pages/admin/AdminDashboard';
import InvalidPage from './pages/InvalidPage';
import DoctorProtectRoute from './pages/auth/DoctorProtectRoute';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorProfile from './pages/doctor/DoctorProfile';
import UserAppointment from './pages/user/UserAppointment';
import './App.css'
import Test from './pages/Test';
import EmailVerify from './pages/auth/EmailVerify';



const App = () => {

  const dispatch = useDispatch()


  // get_notifications
  useEffect(() => {
    dispatch(get_notifications())
    dispatch(get_user_notifications())
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register/email-verify' element={<EmailVerify />} />

        {/* user ProtectRoute */}
        <Route path='/' element={<ProtectRoute />}>
          <Route path='' element={<UserDashbaord />} />
          <Route path='/book-appointments/:appoinmentId' element={<BookAppointments />} />
          <Route path='apply-doctor' element={<ApplyDoctor />} />
          <Route path='user-profile' element={<UserProfile />} />
          <Route path='user-notifications' element={<Notifications />} />
          <Route path='book-appointments' element={<UserAppointment />} />
        </Route>


        {/* AdminProtectRoute */}
        <Route path='/' element={<AdminProtectRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin-users' element={<Users />} />
          <Route path='admin-doctors' element={<Doctors />} />
          <Route path='admin-profile' element={<AdminProfile />} />
          <Route path='admin-notifications' element={<Notifications />} />
        </Route>


        {/* DoctorProtectRoute */}
        <Route path='/' element={<DoctorProtectRoute />}>
          <Route path='doctor' element={<DoctorDashboard />} />
          <Route path='doctor-profile' element={<DoctorProfile />} />

          <Route path='doctor-notifications' element={<Notifications />} />
        </Route>

        {/* InvalidPage route */}
        <Route path='*' element={<InvalidPage />} />
        <Route path='/test' element={<Test />} />

      </Routes>
    </>
  )
}


export default App;