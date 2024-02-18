import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import LogoBar from '../../components/layout/LogoBar';
import { useDispatch, useSelector } from 'react-redux';
import { get_apply_appointments } from '../../store/Reducers/doctorReducer';
import Pagination from '../../components/layout/Pagination';
import moment from 'moment';


const DoctorDashboard = () => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);
    const { id, email, isAdmin, name, isDoctor } = userInfo;

    const { errorMessage, loader, requestAppointmets, requestAppointmetCount } = useSelector(state => state.doctor);
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const [parPage, setParPage] = useState(10)


    // handleMessage
    const handleMessage = (msg) => {
        setSearchValue(msg)
    };


    console.log("requestAppointmets", requestAppointmets)


    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue,
            id
        }
        dispatch(get_apply_appointments(obj))
    }, [searchValue, currentPage, parPage, id])


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
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title bold-text">User Booking List</div>
                                    </div>
                                    <div className="card-body">
                                        <table className="table mt-0 pt-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">No</th>
                                                    <th scope="col">User Name</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Time</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Actions</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    requestAppointmets && requestAppointmets?.map((d, i) =>
                                                        <tr>
                                                            <td>{i + 1 + (currentPage - 1) * parPage}</td>
                                                            <td>{d.userDetails.fullName}</td>
                                                            <td>{moment(d.date).format('DD-MM-YYYY')}</td>
                                                            <td>{moment(d.time, 'HH:mm').format('hh:mm A')}</td>
                                                            <td style={{ textTransform: "capitalize" }}>{d.status}</td>
                                                            <td style={{ cursor: 'pointer', textDecoration: "underline", fontWeight: "bold" }}>
                                                                {d.status === 'pending' ? 'Approved' : 'Rejected'}
                                                            </td>

                                                        </tr>
                                                    )
                                                }

                                            </tbody>
                                        </table>


                                    </div>

                                    <div className='ml-auto px-4'>
                                        {
                                            requestAppointmetCount >= parPage ?
                                                <Pagination
                                                    pageNumber={currentPage}
                                                    setPageNumber={setCurrentPage}
                                                    totalItem={requestAppointmetCount}
                                                    parPage={parPage}
                                                    showItem={Math.floor(requestAppointmetCount / parPage)}
                                                /> : ''
                                        }
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


export default DoctorDashboard;