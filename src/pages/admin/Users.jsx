import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import LogoBar from '../../components/layout/LogoBar';
import { useDispatch, useSelector } from 'react-redux';
import { change_user_Staus, get_users_list, messageClear } from '../../store/Reducers/adminReducer';
import Pagination from '../../components/layout/Pagination';
import toast from 'react-hot-toast';
import moment from 'moment';
import { confirmMessagge } from '../../utils/aleartFunc';



const Users = () => {

    const dispatch = useDispatch();

    const { userCount, loader, allUsers, errorMessage, successMessage } = useSelector(state => state.admin);

    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const [parPage, setParPage] = useState(10)
    const [sideBar, setSideBar] = useState('')

    // handleSideBar
    const handleSideBar = (bar) => {
        const header = document.getElementById('changeHeader');

        if (header) {
            header.classList.toggle('nav_open', bar !== true);
        }
        setSideBar(bar)
    }

    // handleMessage
    const handleMessage = (msg) => {
        setSearchValue(msg)
    };

    // handleItemPerPageChange
    const handleItemPerPageChange = (e) => {
        setParPage(e.target.value)
    }


    // changeUserStauts
    const changeUserStauts = async (id, status) => {
        const obj = {
            id,
            status
        }
        const returnValue = await confirmMessagge(status === true ? 'block' : 'active');
        if (returnValue) {
            dispatch(change_user_Staus(obj))
        }

    }


    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_users_list(obj))
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
            dispatch(get_users_list(obj))
        }
    }, [errorMessage, successMessage])


    return (
        <div className={`wrapper ${sideBar ? 'sidebar_minimize' : ''}`}>
            <div className="main-header">
                <LogoBar onIcon={handleSideBar} />
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
                                        <div className="card-title bold-text">Users List</div>
                                    </div>
                                    <div className="p-3">
                                        <table className="tbl">
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Name</th>
                                                    <th>Created At</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allUsers && allUsers?.map((d, i) =>
                                                        <tr>
                                                            <td data-lable="No">{i + 1 + (currentPage - 1) * parPage}</td>
                                                            <td data-lable="Name">{d.fullName}</td>
                                                            <td data-lable="Created At">{moment(d.createdAt).format('DD/MM/YYYY')}</td>
                                                            <td data-lable="Status">
                                                                <span style={{ textTransform: "capitalize", fontWeight: "bold" }} className={`${d.isActive === false ? 'text-success' : 'text-danger'}`}>
                                                                    <i className={`fas fa-${d.isActive === true ? 'minus' : 'check'}-circle`}></i>
                                                                </span>
                                                            </td>

                                                            <td data-lable="Action" style={{ cursor: "pointer" }}>
                                                                {
                                                                    d.isActive === false ? <span onClick={() => changeUserStauts(d._id, true)} title='Click to block' className='text-danger' style={{ textTransform: "capitalize", fontWeight: "bold" }}>Block</span> :
                                                                        <span onClick={() => changeUserStauts(d._id, false)} title='Click to active' className='text-success' style={{ textTransform: "capitalize", fontWeight: "bold" }}>Active</span>
                                                                }
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
                                                userCount >= parPage ?
                                                    <Pagination
                                                        pageNumber={currentPage}
                                                        setPageNumber={setCurrentPage}
                                                        totalItem={userCount}
                                                        parPage={parPage}
                                                        showItem={Math.floor(userCount / parPage)}
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


export default Users;