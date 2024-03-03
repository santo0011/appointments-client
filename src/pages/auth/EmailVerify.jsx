import React, { useEffect, useState } from 'react';
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { messageClear, user_login, verify_email } from '../../store/Reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import toast from 'react-hot-toast';


const EmailVerify = () => {

    const { handleSubmit, register, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { errorMessage, loader, successMessage } = useSelector(state => state.auth);


    // onSubmit
    const onSubmit = (data) => {
        const { otp } = data;
        const token = localStorage.getItem('appointmentVerifyToken');
        if (token) {
            const obj = {
                otp,
                token
            }
            dispatch(verify_email(obj))
        }
    };

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear());
            localStorage.removeItem('appointmentVerifyToken');
            navigate("/login")
        }
    }, [errorMessage, successMessage])


    return (
        <div className='loginStyle'>
            <div className=" wrapper-login wrapperLogin">
                <div className="container container-login animated fadeIn" style={{ display: 'block' }}>
                    <h4 className="text-center pb-3">Check your email and submit OTP</h4>
                    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                        <div className="form-group">
                            <label htmlFor="otp" className="placeholder"><b>Enter otp</b></label>
                            <input
                                {...register('otp', {
                                    required: 'Otp is required',
                                })}
                                id="otp"
                                name="otp"
                                type="text"
                                className={`form-control ${errors.otp ? 'is-invalid' : ''}`}
                            />
                            {errors.otp && <p className="invalid-feedback">{errors.otp.message}</p>}
                        </div>

                        <div className="form-group form-action-d-flex text-center">
                            <button disabled={loader ? true : false} type="submit" className="btn btn-danger col-md-12 mt-3 mt-sm-0 fw-bold mx-auto">
                                {
                                    loader ? <PropagateLoader color="#fff" cssOverride={overrideStyle} /> : 'Verify'
                                }
                            </button>
                        </div>

                    </form>
                </div>


            </div>

        </div>
    )
}

export default EmailVerify;