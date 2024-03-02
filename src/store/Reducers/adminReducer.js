import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
// import jwt from 'jwt-decode';


// get_notifications
export const get_notifications = createAsyncThunk(
    'admin/get_notifications',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get('/get-notifications');
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


// mark_all_as_seen
export const mark_all_as_seen = createAsyncThunk(
    'admin/mark_all_as_seen',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put('/mark-all-as-seen');
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


// delete_all_seen_notification
export const delete_all_seen_notification = createAsyncThunk(
    'admin/delete_all_seen_notification',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put('/delete-seenNotifications');
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


// get_doctors_list
export const get_doctors_list = createAsyncThunk(
    'admin/get_doctors_list',
    async ({ searchValue, page, parPage }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-doctors-list?searchValue=${searchValue}&&page=${page}&&parPage=${parPage}`);
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// change_doctor_Staus
export const change_doctor_Staus = createAsyncThunk(
    'admin/change_doctor_Staus',
    async (obj, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/change-doctor-status`, obj);
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


// get_users_list
export const get_users_list = createAsyncThunk(
    'admin/get_users_list',
    async ({ searchValue, page, parPage }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-users-list?searchValue=${searchValue}&&page=${page}&&parPage=${parPage}`);
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// change_user_Staus
export const change_user_Staus = createAsyncThunk(
    'admin/change_user_Staus',
    async (obj, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/change-user-status`, obj);
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



export const adminReducer = createSlice({
    name: "admin",
    initialState: {
        errorMessage: '',
        successMessage: '',
        loader: false,
        seenNotifications: [],
        unseenNotifications: [],
        allDoctor: [],
        doctorCount: 0,
        allUsers: [],
        userCount: 0
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        }
    },
    extraReducers: {
        [get_notifications.fulfilled]: (state, { payload }) => {
            state.seenNotifications = payload.seenNotifications
            state.unseenNotifications = payload.unseenNotifications
        },
        [mark_all_as_seen.pending]: (state, _) => {
            state.loader = true
        },
        [mark_all_as_seen.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error
        },
        [mark_all_as_seen.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
        },
        [delete_all_seen_notification.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error
        },
        [delete_all_seen_notification.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
        },
        [get_doctors_list.pending]: (state, _) => {
            state.loader = true
        },
        [get_doctors_list.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.allDoctor = payload.allDoctor
            state.doctorCount = payload.doctorCount
        },
        [change_doctor_Staus.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error
        },
        [change_doctor_Staus.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
        },
        [get_users_list.pending]: (state, _) => {
            state.loader = true
        },
        [get_users_list.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.allUsers = payload.allUsers
            state.userCount = payload.userCount
        },
        [change_user_Staus.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error
        },
        [change_user_Staus.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
        }

    }
});


export const { messageClear } = adminReducer.actions;
export default adminReducer.reducer;