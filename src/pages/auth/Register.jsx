import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import './auth.css';
import { useDispatch, useSelector } from 'react-redux';
import { messageClear, user_register } from '../../store/Reducers/authReducer';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import toast from 'react-hot-toast';


const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { handleSubmit, getValues, control, setValue, register, formState: { errors } } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { errorMessage, loader, successMessage } = useSelector(state => state.auth);

    // onSubmit
    const onSubmit = (data) => {
        const { fullName, email, password } = data;
        const obj = {
            fullName,
            email,
            password
        }
        dispatch(user_register(obj))
    };


    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            navigate('/register/email-verify', { replace: true })
        }
    }, [errorMessage, successMessage])

    return (
        <div className='registerStyle py-5'>
            <div className=" wrapper-login wrapperRegister">
                <div className="container container-login animated fadeIn">
                    <h2 className="text-center pb-3 font-weight-bold">Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                        <div className="form-group row">
                            <div className="col-md-12 mb-3">
                                <label htmlFor="fullName" className="placeholder"><b>Full Name</b></label>
                                <input
                                    {...register('fullName', {
                                        required: 'Full Name is required',
                                    })}
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                                />
                                {errors.fullName && <p className="invalid-feedback">{errors.fullName.message}</p>}
                            </div>

                            <div className="col-md-12 mb-3">
                                <label htmlFor="email" className="placeholder"><b>Email</b></label>
                                <input
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                    id="email"
                                    name="email"
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                />
                                {errors.email && <p className="invalid-feedback">{errors.email.message}</p>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="password" className="placeholder"><b>Password</b></label>
                                <div className="input-group">
                                    <input
                                        {...register('password', {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be at least 6 characters long',
                                            },
                                            maxLength: {
                                                value: 10,
                                                message: 'Password must not exceed 10 characters',
                                            },
                                        })}
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                    {errors.password && <p className="invalid-feedback">{errors.password.message}</p>}
                                </div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="confirmPassword" className="placeholder"><b>Confirm Password</b></label>
                                <input
                                    {...register('confirmPassword', {
                                        required: 'Confirm Password is required',
                                        validate: value => value === getValues('password') || 'Passwords do not match',
                                    })}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                />
                                {errors.confirmPassword && <p className="invalid-feedback">{errors.confirmPassword.message}</p>}
                            </div>


                        </div>

                        <div className="form-group form-action-d-flex mb-3 text-center">
                            <button disabled={loader ? true : false} type="submit" className="btn btn-primary col-md-12 mt-3 mt-sm-0 fw-bold mx-auto">
                                {
                                    loader ? <PropagateLoader color="#fff" cssOverride={overrideStyle} /> : 'Register'
                                }
                            </button>
                        </div>
                        <div className="login-account" style={{ textAlign: "center" }}>
                            <span className="msg">Already have an account?</span>
                            <Link to='/login' id="show-login" className="link"> Login</Link>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    )
}

export default Register;