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
import { cancle_appointment, get_appointment, messageClear } from '../../store/Reducers/userReducer';
import { confirmMessagge } from '../../utils/aleartFunc';

const Test = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { id, email, isAdmin, name, isDoctor } = userInfo;

    const [selectAll, setSelectAll] = useState(false);

    const dispatch = useDispatch();

    const { errorMessage, successMessage, loader, myAppointments, myAppointmentCount } = useSelector(state => state.user);

    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [parPage, setParPage] = useState(10);
    const [selectedToppings, setSelectedToppings] = useState([]);

    const handleToppingChange = (event) => {
        const { value, checked } = event.target;
        const appointmentId = event.target.dataset.id; // Using appointment ID
        let updatedToppings;

        if (checked) {
            updatedToppings = [...selectedToppings, { id: appointmentId, value }];
        } else {
            updatedToppings = selectedToppings.filter((t) => t.id !== appointmentId);
        }

        setSelectedToppings(updatedToppings);

        // Handle individual checkbox precedence over "Select All"
        if (updatedToppings.length === myAppointments.length) {
            setSelectAll(true);
        } else if (selectAll) {
            setSelectAll(false);
        }
    };

    const handleSelectAllChange = (event) => {
        const checked = event.target.checked;

        setSelectAll(checked);

        if (checked) {
            const allToppings = myAppointments.map(({ _id }) => ({ id: _id, value: _id }));
            setSelectedToppings(allToppings);
        } else {
            setSelectedToppings([]);
        }
    };

    // handleMessage
    const handleMessage = (msg) => {
        setSearchValue(msg)
    };

    // handleItemPerPageChange
    const handleItemPerPageChange = (e) => {
        setParPage(e.target.value)
    }

    // cancleAppointment
    const cancleAppointment = async (appoi_id, doctorUserId) => {
        const obj = {
            appoi_id,
            doctorUserId,
            userName: userInfo.name,
        }

        const returnValue = await confirmMessagge('cancled');
        if (returnValue) {
            dispatch(cancle_appointment(obj))
        }
    }

    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue,
        }
        dispatch(get_appointment(obj))
    }, [searchValue, currentPage, parPage, successMessage])

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
                                        <div className="card-title bold-text">My Booking List</div>
                                    </div>
                                    <div className="p-3">
                                        <table className="tbl">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectAll}
                                                            onChange={handleSelectAllChange}
                                                        />
                                                    </th>
                                                    <th>No</th>
                                                    <th>Doctor Name</th>
                                                    <th>Date</th>
                                                    <th>Time</th>
                                                    <th>Fee</th>
                                                    <th>Location</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {myAppointments && myAppointments?.map((d, i) => (
                                                    <tr key={d._id}>
                                                        <td data-lable="Select">
                                                            <input
                                                                type="checkbox"
                                                                data-id={d._id}
                                                                checked={selectedToppings.some(t => t.id === d._id)}
                                                                onChange={handleToppingChange}
                                                            />
                                                        </td>
                                                        <td data-lable="No">{i + 1 + (currentPage - 1) * parPage}</td>
                                                        <td data-lable="Doctor Name">Dr. {d.doctorDetails.firstName} {d.doctorDetails.lastName}</td>
                                                        <td data-lable="Date">{moment(d.date).format('DD/MM/YYYY')}</td>
                                                        <td data-lable="Time">{moment(d.time, 'HH:mm').format('hh:mm A')}</td>
                                                        <td data-lable="Fee"> ₹  {d.doctorDetails.feePerConsultation}</td>
                                                        <td data-lable="Location">{d.doctorDetails.address}</td>
                                                        <td data-lable="Status">
                                                            <span style={{ textTransform: "capitalize", fontWeight: "bold" }} className={`${d.status === 'approved' ? 'text-success' : d.status === 'rejected' ? 'text-danger' : 'text-primary'} text-center`}>{d.status}</span>
                                                        </td>
                                                        <td data-lable="Action">
                                                            <button onClick={() => cancleAppointment(d._id, d.doctorDetails.userId)} className='btn btn-danger px-2 py-1 font-weight-bold'>Cancel</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <div className="col-md-4 d-flex justify-content-start align-items-center itemParPageStyle">
                                            <div class="form-group row">
                                                <label for="itemPerPage" class="col-sm-auto col-form-label">Show :</label>
                                                <div class="col-sm-auto">
                                                    <select
                                                        id='itemPerPage'
                                                        style={{ width: "65px", marginLeft: "-23px", marginTop: "10px" }}
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
                                            {myAppointmentCount >= parPage && (
                                                <Pagination
                                                    pageNumber={currentPage}
                                                    setPageNumber={setCurrentPage}
                                                    totalItem={myAppointmentCount}
                                                    parPage={parPage}
                                                    showItem={Math.floor(myAppointmentCount / parPage)}
                                                />
                                            )}
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


export default Test;
