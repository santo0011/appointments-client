import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import LogoBar from '../../components/layout/LogoBar';
import { useDispatch, useSelector } from 'react-redux';
import { change_doctor_Staus, get_doctors_list, messageClear } from '../../store/Reducers/adminReducer';
import Pagination from '../../components/layout/Pagination';
import toast from 'react-hot-toast';
import moment from 'moment';


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


    // approvedDoctor
    const changeDoctorStauts = (id, userId, status) => {
        const obj = {
            id,
            userId,
            status
        }
        dispatch(change_doctor_Staus(obj))
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
                                                    <th scope="col">No</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Phone</th>
                                                    <th scope="col">Created At</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allDoctor && allDoctor?.map((d, i) =>
                                                        <tr>
                                                            <td>{i + 1 + (currentPage - 1) * parPage}</td>
                                                            <td>{d.firstName} {d.lastName}</td>
                                                            <td>{d.phoneNumber}</td>
                                                            <td>{moment(d.createdAt).format('DD/MM/YYYY')}</td>
                                                            <td style={{ textTransform: "capitalize" }}>{d.status}</td>
                                                            <td style={{ cursor: 'pointer', textDecoration: "underline", fontWeight: "bold" }}>
                                                                {d.status === 'pending' && (
                                                                    <span onClick={() => (changeDoctorStauts(d._id, d.userId, 'approved'))} className="text-decoration-underline">Approve</span>
                                                                )}
                                                                {d.status === 'approved' && (
                                                                    <span onClick={() => (changeDoctorStauts(d._id, d.userId, 'block'))} className="text-decoration-underline">Block</span>
                                                                )}
                                                                {d.status === 'block' && (
                                                                    <span onClick={() => (changeDoctorStauts(d._id, d.userId, 'approved'))} className="text-decoration-underline">Active</span>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                }

                                            </tbody>
                                        </table>


                                    </div>

                                    <div className='ml-auto px-4'>
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
    )
}

export default Doctors;