import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import LogoBar from '../../components/layout/LogoBar';
import { useForm } from 'react-hook-form';
import { PropagateLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { overrideStyle } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { get_doctor_details, messageClear, update_doctor } from '../../store/Reducers/userReducer';


const DoctorProfile = () => {

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);
    const { id, isAdmin, name, isDoctor } = userInfo;
    const { doctorDetails, loader, successMessage, errorMessage } = useSelector((state) => state.user);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const [sideBar, setSideBar] = useState('')

    // handleSideBar
    const handleSideBar = (bar) => {
        setSideBar(bar)
    }



    const [doctor, setDector] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        department: "",
        experience: "",
        specialization: "",
        feePerConsultation: "",
        fromTime: "",
        toTime: ""
    });

    const { firstName, lastName, email, phoneNumber, address, department, specialization, experience, feePerConsultation, fromTime, toTime } = doctor;


    // onSubmit
    const onSubmit = (data) => {
        const { firstName, lastName, email, phoneNumber, address, department, specialization, experience, feePerConsultation, fromTime, toTime } = data;
        const doctorInfo = {
            firstName, lastName, email, phoneNumber, address, department, specialization, experience, feePerConsultation, fromTime, toTime
        };

        dispatch(update_doctor({
            info: doctorInfo,
            id: doctorDetails._id
        }));
    };



    useEffect(() => {

        const { firstName, lastName, email, phoneNumber, address, department, specialization, experience, feePerConsultation, fromTime, toTime } = doctorDetails;

        const defaultValues = {
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'phoneNumber': phoneNumber,
            'address': address,
            'department': department,
            'specialization': specialization,
            'experience': experience,
            'feePerConsultation': feePerConsultation,
            'fromTime': fromTime,
            'toTime': toTime
        }

        Object.entries(defaultValues).forEach(([fieldName, value]) => {
            setValue(fieldName, value);
        });

    }, [setValue, firstName, lastName, email, phoneNumber, address, department, specialization, experience, feePerConsultation, fromTime, toTime, doctorDetails])


    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
    }, [errorMessage, successMessage])


    useEffect(() => {
        dispatch(get_doctor_details(id))
    }, [id, successMessage])

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
                                        <div className="card-title bold-text">Update Doctor Account</div>
                                    </div>

                                    <div className="card-body">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="row">
                                                <div className="col-md-6 col-lg-4">
                                                    <div className="form-group">
                                                        <label htmlFor="firstName">First Name <span className='text-danger'>*</span></label>
                                                        <input type="text" name='firstName' className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} id="firstName" {...register('firstName', { required: 'First Name is required' })} />
                                                        {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4">
                                                    <div className="form-group">
                                                        <label htmlFor="lastName">Last Name <span className='text-danger'>*</span></label>
                                                        <input type="text" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} id="lastName" {...register('lastName', { required: 'Last Name is required' })} />
                                                        {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Email Address <span className='text-danger'>*</span></label>
                                                        <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" {...register('email', {
                                                            required: 'Email is required', pattern: {
                                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                                message: 'Invalid email address',
                                                            },
                                                        })} />
                                                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col-md-6 col-lg-4">
                                                    <div className="form-group">
                                                        <label htmlFor="phoneNumber">Phone Number <span className='text-danger'>*</span></label>
                                                        <input
                                                            type="tel"
                                                            className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                                            id="phoneNumber"
                                                            {...register('phoneNumber', {
                                                                required: 'Phone Number is required',
                                                                pattern: {
                                                                    value: /^[0-9]{10}$/,
                                                                    message: 'Invalid phone number'
                                                                },
                                                                minLength: { value: 10, message: 'Phone number must be at least 10 characters long' },
                                                                maxLength: { value: 13, message: 'Phone number must be at most 13 characters long' }
                                                            })}
                                                        />
                                                        {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber.message}</div>}
                                                    </div>

                                                </div>
                                                <div className="col-md-6 col-lg-4">
                                                    <div className="form-group">
                                                        <label htmlFor="address">Address <span className='text-danger'>*</span></label>
                                                        <input type="text" className={`form-control ${errors.address ? 'is-invalid' : ''}`} id="address" {...register('address', { required: 'Address is required' })} />
                                                        {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
                                                    </div>
                                                </div>

                                            </div>

                                            <hr className="hr" />

                                            <div className="row">
                                                <div className="col-md-6 col-lg-4">
                                                    <div className="form-group">
                                                        <label htmlFor="department">Department <span className='text-danger'>*</span></label>
                                                        <input type="text" className={`form-control ${errors.department ? 'is-invalid' : ''}`} id="department" {...register('department', { required: 'Department is required' })} />
                                                        {errors.department && <div className="invalid-feedback">{errors.department.message}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-md-6 col-lg-4">
                                                    <div className="form-group">
                                                        <label htmlFor="specialization">Specialization <span className='text-danger'>*</span></label>
                                                        <input type="text" className={`form-control ${errors.specialization ? 'is-invalid' : ''}`} id="specialization" {...register('specialization', { required: 'Specialization is required' })} />
                                                        {errors.specialization && <div className="invalid-feedback">{errors.specialization.message}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4">
                                                    <div className="form-group">
                                                        <label htmlFor="experience">Experience <span className='text-danger'>*</span></label>
                                                        <input type="number" className={`form-control ${errors.experience ? 'is-invalid' : ''}`} id="experience" {...register('experience', { required: 'Experience is required', min: { value: 0, message: 'Experience must be a positive number' } })} />
                                                        {errors.experience && <div className="invalid-feedback">{errors.experience.message}</div>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">

                                                <div className="col-md-6 col-lg-4">
                                                    <div className="form-group">
                                                        <label htmlFor="feePerConsultation">Fee Per Consultation <span className='text-danger'>*</span></label>
                                                        <input type="number" className={`form-control ${errors.feePerConsultation ? 'is-invalid' : ''}`} id="feePerConsultation" {...register('feePerConsultation', { required: 'Fee Per Consultation is required', min: { value: 0, message: 'Fee must be a positive number' } })} />
                                                        {errors.feePerConsultation && <div className="invalid-feedback">{errors.feePerConsultation.message}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4">
                                                    <div className="form-group">
                                                        <label htmlFor="fromTime">From Time <span className='text-danger'>*</span></label>
                                                        <input type="time" className={`form-control ${errors.fromTime ? 'is-invalid' : ''}`} id="fromTime" {...register('fromTime', { required: 'From Time is required' })} />
                                                        {errors.fromTime && <div className="invalid-feedback">{errors.fromTime.message}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-4">
                                                    <div className="form-group">
                                                        <label htmlFor="toTime">To Time <span className='text-danger'>*</span></label>
                                                        <input type="time" className={`form-control ${errors.toTime ? 'is-invalid' : ''}`} id="toTime" {...register('toTime', { required: 'To Time is required' })} />
                                                        {errors.toTime && <div className="invalid-feedback">{errors.toTime.message}</div>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="m-3" style={{ textAlign: "right" }}>
                                                <button disabled={loader ? true : false} className="btn btn-primary px-5 py-2">
                                                    {
                                                        loader ? <PropagateLoader color="#fff" cssOverride={overrideStyle} /> : 'Update'
                                                    }
                                                </button>
                                            </div>
                                        </form>


                                    </div>
                                    {/* <div className="card-action ml-auto">
                                        <button className="btn btn-primary">Submit</button>
                                    </div> */}
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile;