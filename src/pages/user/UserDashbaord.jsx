import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import LogoBar from '../../components/layout/LogoBar';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import moment from 'moment';
import Pagination from '../../components/layout/Pagination';
import { get_all_doctor } from '../../store/Reducers/userReducer';
import { Link } from 'react-router-dom';


const UserDashbaord = () => {
    const dispatch = useDispatch();

    const { userDoctorCount, loader, userDoctors } = useSelector(state => state.user);


    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const [parPage, setParPage] = useState(10)

    // handleMessage
    const handleMessage = (msg) => {
        setSearchValue(msg)
    };

    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_all_doctor(obj))
    }, [searchValue, currentPage, parPage,])



    return (
        <div className="wrapper">
            <div className="main-header">
                <LogoBar />
                <Navbar onMessage={handleMessage} />
            </div>
            <Sidebar />
            <div className="main-panel">
                <div className="content">
                    <div className="page-inner">

                        <div className="row">

                            {
                                userDoctors?.map((d) =>
                                    <Link to={`/book-appointments/${d.userId}`} className="col-lg-4 col-md-6" style={{ textDecoration: 'none', color: "black" }}>
                                        <div className="card full-height">
                                            <div className="card-header pb-2 pt-2">
                                                <div className="card-title">{d.firstName} {d.lastName}</div>
                                            </div>
                                            <div className="card-body pt-2">
                                                <p className='p-0 m-0 fs-6'>{d.specialization}</p>
                                                <p className='p-0 m-0'>
                                                    <span className="font-weight-bold">Exprience : </span> {d.experience} Years
                                                </p>
                                                <p className='p-0 m-0'>
                                                    <span className="font-weight-bold">Fee Per Visit : </span> ₹ {d.feePerConsultation}
                                                </p>
                                                <p className='p-0 m-0'>
                                                    <span className="font-weight-bold">Locations : </span> {d.address}
                                                </p>
                                                <p className='p-0 m-0'>
                                                    <span className="font-weight-bold">Timings : </span> {moment(d.fromTime, 'HH:mm').format('hh:mm A')} - {moment(d.toTime, 'HH:mm').format('hh:mm A')}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }

                        </div>

                        <div className='d-flex justify-content-end'>
                            <div className='ml-auto'>
                                {userDoctorCount >= parPage ?
                                    <Pagination
                                        pageNumber={currentPage}
                                        setPageNumber={setCurrentPage}
                                        totalItem={userDoctorCount}
                                        parPage={parPage}
                                        showItem={Math.floor(userDoctorCount / parPage)}
                                    /> : ''
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}



export default UserDashbaord;