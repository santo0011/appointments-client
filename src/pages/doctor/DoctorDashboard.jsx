import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import LogoBar from '../../components/layout/LogoBar';
import { useDispatch, useSelector } from 'react-redux';
import { approve_book_status, get_apply_appointments, messageClear } from '../../store/Reducers/doctorReducer';
import Pagination from '../../components/layout/Pagination';
import moment from 'moment';
import toast from 'react-hot-toast';
import { confirmMessagge } from '../../utils/aleartFunc';



const DoctorDashboard = () => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);
    const { id, email, isAdmin, name, isDoctor } = userInfo;

    const { errorMessage, successMessage, loader, requestAppointmets, requestAppointmetCount } = useSelector(state => state.doctor);
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const [parPage, setParPage] = useState(10)


    // handleItemPerPageChange
    const handleItemPerPageChange = (e) => {
        setParPage(e.target.value)
    }

    // handleMessage
    const handleMessage = (msg) => {
        setSearchValue(msg)
    };

    // handleBookingStatus
    const handleBookingStatus = async (bookId, status, data) => {
        const obj = {
            bookId,
            status,
            userId: data.userDetails._id,
            doctorId: data.doctorId
        }
        const returnValue = await confirmMessagge(status);
        if (returnValue) {
            dispatch(approve_book_status(obj))
        }
    }


    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue,
            id
        }
        dispatch(get_apply_appointments(obj))
    }, [searchValue, currentPage, parPage, id, successMessage])


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
                                    <div className="p-3">
                                        <table className="tbl">
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>User Name</th>
                                                    <th>Date</th>
                                                    <th>Time</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    requestAppointmets && requestAppointmets?.map((d, i) =>
                                                        <tr>
                                                            <td data-lable="No">{i + 1 + (currentPage - 1) * parPage}</td>
                                                            <td data-lable="User Name">{d.userDetails.fullName}</td>
                                                            <td data-lable="Date">{moment(d.date).format('DD-MM-YYYY')}</td>
                                                            <td data-lable="Time">{moment(d.time, 'HH:mm').format('hh:mm A')}</td>
                                                            <td data-lable="Status">
                                                                <span style={{ textTransform: "capitalize", fontWeight: "bold" }} className={`${d.status === 'approved' ? 'text-success' : d.status === 'rejected' ? 'text-danger' : 'text-primary'} text-center asdfksfasdf`}>{d.status}</span>
                                                            </td>
                                                            <td data-lable="Action">
                                                                <div className="dropdown">
                                                                    <button className="btn btn-danger btn-sm dropdown-toggl" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        Select
                                                                    </button>
                                                                    <ul className="dropdown-menu">
                                                                        <li onClick={() => (handleBookingStatus(d._id, 'approved', d))} ><a className="dropdown-item  text-success py-2 font-weight-bold">Approve</a></li>
                                                                        <li onClick={() => (handleBookingStatus(d._id, 'rejected', d))} ><a className="dropdown-item  text-danger py-2 font-weight-bold">Reject</a></li>
                                                                    </ul>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }

                                            </tbody>
                                        </table>


                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <div className="col-md-4 d-flex justify-content-start align-items-center itemParPageStyle">
                                            <div class="form-group row">
                                                <label for="itemPerPage" class="col-sm-auto col-form-label">Select items per page :</label>
                                                <div class="col-sm-auto">
                                                    <select
                                                        id='itemPerPage'
                                                        style={{ width: "65px", marginLeft: "-23px", marginTop: "7px", padding: "3px" }}
                                                        onChange={handleItemPerPageChange}
                                                        value={parPage}
                                                    >
                                                        <option value="10">10</option>
                                                        <option value="20">20</option>
                                                        <option value="50">50</option>
                                                        <option value="100">100</option>

                                                    </select>
                                                </div>
                                            </div>

                                        </div>

                                        <div className='px-4'>
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
        </div>
    )
}


export default DoctorDashboard;