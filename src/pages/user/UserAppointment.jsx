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
import moment from 'moment';
import Pagination from '../../components/layout/Pagination';
import { get_appointment } from '../../store/Reducers/userReducer';


const UserAppointment = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { id, email, isAdmin, name, isDoctor } = userInfo;

    const dispatch = useDispatch()

    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const [parPage, setParPage] = useState(5)

    // handleItemPerPageChange
    const handleItemPerPageChange = (e) => {
        setParPage(e.target.value)
    }


    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue,
        }
        dispatch(get_appointment(obj))
    }, [searchValue, currentPage, parPage, id])



    let requestAppointmetCount = 10;

    return (
        <div className="wrapper">
            <div className="main-header">
                <LogoBar />
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
                                        <div className="card-title bold-text">My Booking List</div>
                                    </div>
                                    <div className="card-body">
                                        <table className="table mt-0 pt-0 ">
                                            <thead>
                                                <tr>
                                                    <th className='text-center' scope="col">No</th>
                                                    <th className='text-center' scope="col">Doctor Name</th>
                                                    <th className='text-center' scope="col">Date</th>
                                                    <th className='text-center' scope="col">Time</th>
                                                    <th className='text-center' scope="col">Fee</th>
                                                    <th className='text-center' scope="col">Location</th>
                                                    <th className='text-center' scope="col">Status</th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    [1, 2, 3, 4, 5, 6].map((b, i) => {
                                                        return <>
                                                            <tr>
                                                                <td className='text-center'>{i + 1 + (currentPage - 1) * parPage}</td>
                                                                <td className='text-center'>Dr. Ria Alexander</td>
                                                                <td className='text-center'>23-02-2024</td>
                                                                <td className='text-center'>3:15 PM</td>
                                                                <td className='text-center'> ₹  500</td>
                                                                <td className='text-center'>Nahata</td>
                                                                <td className='text-center' style={{ textTransform: "capitalize" }}>pending</td>
                                                            </tr>
                                                        </>
                                                    })
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


export default UserAppointment;