import React, { useEffect, useState } from 'react';
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { messageClear, user_login } from '../../store/Reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import toast from 'react-hot-toast';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { handleSubmit, setValue, register, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { errorMessage, loader, successMessage, userInfo } = useSelector(state => state.auth);


    // onSubmit
    const onSubmit = (data) => {
        const { email, password } = data;
        const obj = {
            email,
            password
        }
        dispatch(user_login(obj))
    };

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear());

            if (!userInfo.isAdmin) {
                if (userInfo.isDoctor) {
                    navigate('/doctor', { replace: true })
                } else {
                    navigate('/', { replace: true })
                }
            } else {
                navigate('/admin', { replace: true })
            }

        }
    }, [errorMessage, successMessage])


    return (
        <div className='loginStyle'>
            <div className=" wrapper-login wrapperLogin">
                <div className="container container-login animated fadeIn" style={{ display: 'block' }}>
                    <h2 className="text-center pb-3 font-weight-bold">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                        <div className="form-group">
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
                        <div className="form-group">
                            <label htmlFor="password" className="placeholder"><b>Password</b></label>
                            <div className="input-group">
                                <input
                                    {...register('password', {
                                        required: 'Password is required',
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
                        <div className="form-group form-action-d-flex mb-3 text-center">
                            <button disabled={loader ? true : false} type="submit" className="btn btn-primary col-md-12 mt-3 mt-sm-0 fw-bold mx-auto">
                                {
                                    loader ? <PropagateLoader color="#fff" cssOverride={overrideStyle} /> : 'Login'
                                }
                            </button>
                        </div>
                        <div className="login-account" style={{ textAlign: "center" }}>
                            <span className="msg">Don't have an account yet ?</span>
                            <Link to='/register' id="show-signup" className="link"> Register</Link>
                        </div>
                    </form>
                </div>


            </div>

        </div>
    )
}

export default Login;