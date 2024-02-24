import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import LogoBar from '../../components/layout/LogoBar';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { overrideStyle } from '../../utils/utils';
import { book_appointment, check_book_avilabity, get_doctor_details, messageClear } from '../../store/Reducers/userReducer';
import moment from 'moment';



const Appointments = () => {

    const { appoinmentId } = useParams();
    const dispatch = useDispatch();

    const { doctorDetails, loader, successMessage, errorMessage } = useSelector((state) => state.user);
    const { userInfo } = useSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isBook, setIsBook] = useState(false)

    const [sideBar, setSideBar] = useState('')

    // handleSideBar
    const handleSideBar = (bar) => {
        setSideBar(bar)
    }

    // onSubmit
    const onSubmit = (data) => {
        const { date, time } = data;

        const obj = {
            date,
            time,
            userId: userInfo.id,
            userName: userInfo.name,
            doctorId: doctorDetails._id,
            doctorUserId: doctorDetails.userId
        }

        if (!isBook) {
            dispatch(check_book_avilabity(obj))
        } else {
            dispatch(book_appointment(obj))
        }

    };

    useEffect(() => {
        dispatch(get_doctor_details(appoinmentId))
    }, [appoinmentId])


    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            setIsBook(!isBook)
        }
    }, [errorMessage, successMessage])


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
                                        <div className="card-title bold-text">Dr. {doctorDetails?.firstName} {doctorDetails?.lastName}</div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card-header px-2 pt-0 pb-1">
                                                    <h4>Timings</h4>
                                                </div>
                                                <div>
                                                    <p className="card-category px-2 font-weight-bold">{moment(doctorDetails?.fromTime, 'HH:mm').format('hh:mm A')} - {moment(doctorDetails?.toTime, 'HH:mm').format('hh:mm A')}</p>

                                                    <form onSubmit={handleSubmit(onSubmit)}>

                                                        <div className="form-group pt-3">
                                                            <label htmlFor="fromTime">Select Your Slot</label>
                                                            {/* <input type="date" className='form-control mb-3' placeholder='Select date' id="date" /> */}

                                                            <div className="form-group px-0">
                                                                <input type="date" className={`form-control ${errors.date ? 'is-invalid' : ''}`} id="date" {...register('date', { required: 'Date is required' })} />
                                                                {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
                                                            </div>

                                                            <div className="form-group px-0">
                                                                <input type="time" className={`form-control ${errors.time ? 'is-invalid' : ''}`} id="time" {...register('time', { required: 'Time is required' })} />
                                                                {errors.time && <div className="invalid-feedback">{errors.time.message}</div>}

                                                            </div>

                                                            {
                                                                !isBook && <div className="form-group px-0">
                                                                    <button disabled={loader ? true : false} type="submit" className="btn btn-primary col-md-12 mt-3 mt-sm-0 fw-bold mx-auto">
                                                                        {
                                                                            loader ? <PropagateLoader color="#fff" cssOverride={overrideStyle} /> : 'Check Availability'
                                                                        }
                                                                    </button>
                                                                </div>
                                                            }


                                                            {
                                                                isBook && <div className="form-group px-0">
                                                                    <button disabled={loader ? true : false} type="submit" className="btn btn-primary col-md-12 mt-3 mt-sm-0 fw-bold mx-auto">
                                                                        {
                                                                            loader ? <PropagateLoader color="#fff" cssOverride={overrideStyle} /> : 'Book Now'
                                                                        }
                                                                    </button>
                                                                </div>
                                                            }


                                                        </div>

                                                    </form>

                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-header px-3 px-0 pt-0 pb-1">
                                                    <h4>Basic Info</h4>
                                                </div>
                                                <div className="card-body pt-2">
                                                    <p className='p-0 m-0 fs-6 text'>Tempora eu exercitat</p>
                                                    <p className='p-0 m-0 fs-6 text'>
                                                        <span className="font-weight-bold">Exprience : </span> {doctorDetails?.experience} Years
                                                    </p>
                                                    <p className='p-0 m-0 fs-6 text'>
                                                        <span className="font-weight-bold">Fee Per Visit : </span> ₹ {doctorDetails?.feePerConsultation}
                                                    </p>
                                                    <p className='p-0 m-0 fs-6 text'>
                                                        <span className="font-weight-bold">Locations : </span> {doctorDetails?.address}
                                                    </p>

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


export default Appointments;