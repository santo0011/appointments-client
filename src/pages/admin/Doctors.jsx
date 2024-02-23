import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import LogoBar from '../../components/layout/LogoBar';
import { useDispatch, useSelector } from 'react-redux';
import { change_doctor_Staus, get_doctors_list, messageClear } from '../../store/Reducers/adminReducer';
import Pagination from '../../components/layout/Pagination';
import toast from 'react-hot-toast';
import moment from 'moment';
import { confirmMessagge } from '../../utils/aleartFunc';



const Doctors = () => {

    const dispatch = useDispatch();

    const { doctorCount, loader, allDoctor, errorMessage, successMessage } = useSelector(state => state.admin);

    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const [parPage, setParPage] = useState(10)


    // handleMessage
    const handleMessage = (msg) => {
        setSearchValue(msg)
    };

    // handleItemPerPageChange
    const handleItemPerPageChange = (e) => {
        setParPage(e.target.value)
    }


    // approvedDoctor
    const changeDoctorStauts = async (id, userId, status) => {
        const obj = {
            id,
            userId,
            status
        }
        const returnValue = await confirmMessagge(status);
        if (returnValue) {
            dispatch(change_doctor_Staus(obj))
        }

    }


    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_doctors_list(obj))
    }, [searchValue, currentPage, parPage])


    useEffect(() => {

        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }

        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            dispatch(get_doctors_list(obj))
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
                                        <div className="card-title bold-text">Doctors List</div>
                                    </div>
                                    <div className="card-body">
                                        <table className="table mt-0 pt-0">
                                            <thead>
                                                <tr>
                                                    <th className='text-center' scope="col">No</th>
                                                    <th className='text-center' scope="col">Name</th>
                                                    <th className='text-center' scope="col">Phone</th>
                                                    <th className='text-center' scope="col">Created At</th>
                                                    <th className='text-center' scope="col">Status</th>
                                                    <th className='text-center' scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allDoctor && allDoctor?.map((d, i) =>
                                                        <tr>
                                                            <td className='text-center'>{i + 1 + (currentPage - 1) * parPage}</td>
                                                            <td className='text-center'>{d.firstName} {d.lastName}</td>
                                                            <td className='text-center'>{d.phoneNumber}</td>
                                                            <td className='text-center'>{moment(d.createdAt).format('DD/MM/YYYY')}</td>
                                                            <td style={{ textTransform: "capitalize", fontWeight: "bold" }} className={`${d.status === 'approved' ? 'text-success' : d.status === 'blocked' ? 'text-danger' : 'text-primary'} text-center`}>{d.status}</td>


                                                            <td className='text-center' style={{ cursor: 'pointer', textDecoration: "underline", fontWeight: "bold" }}>

                                                                <div className="dropdown">
                                                                    <button className="btn btn-primary btn-sm dropdown-toggl" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        Select
                                                                    </button>
                                                                    <ul className="dropdown-menu">
                                                                        <li onClick={() => (changeDoctorStauts(d._id, d.userId, 'approved'))} ><a className="dropdown-item  text-success py-2 font-weight-bold">Approve</a></li>
                                                                        <li onClick={() => (changeDoctorStauts(d._id, d.userId, 'blocked'))} ><a className="dropdown-item  text-danger py-2 font-weight-bold">Block</a></li>
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
                                        <div className="col-md-4 d-flex justify-content-start align-items-center">
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
                                                doctorCount >= parPage ?
                                                    <Pagination
                                                        pageNumber={currentPage}
                                                        setPageNumber={setCurrentPage}
                                                        totalItem={doctorCount}
                                                        parPage={parPage}
                                                        showItem={Math.floor(doctorCount / parPage)}
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

export default Doctors;