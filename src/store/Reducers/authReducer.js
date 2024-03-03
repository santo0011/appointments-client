import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
// import jwt from 'jwt-decode';


// user_register
export const user_register = createAsyncThunk(
    'auth/user_register',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/user-register', info);
            localStorage.setItem('appointmentVerifyToken', data.verifyEmailToken)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// verify_email
export const verify_email = createAsyncThunk(
    'auth/verify_email',
    async (obj, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/verify-email', obj);
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


// user_login
export const user_login = createAsyncThunk(
    'auth/user_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/user-login', info);
            localStorage.setItem('user_info', JSON.stringify(data.userInfo))
            localStorage.setItem('user_token', data.token)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



export const authReducer = createSlice({
    name: "auth",
    initialState: {
        authenticate: false,
        userInfo: JSON.parse(localStorage.getItem('user_info')),
        errorMessage: '',
        successMessage: '',
        loader: false,
        token: localStorage.getItem("user_token")
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        }
    },
    extraReducers: {
        [user_register.pending]: (state, _) => {
            state.loader = true
        },
        [user_register.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error
        },
        [user_register.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
        },
        [verify_email.pending]: (state, _) => {
            state.loader = true
        },
        [verify_email.rejected]: (state, { payload }) => {
            state.loader = false
            state.errorMessage = payload.error
        },
        [verify_email.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.successMessage = payload.message
        },
        [user_login.pending]: (state, _) => {
            state.loader = true
        },
        [user_login.rejected]: (state, { payload }) => {
            state.loader = false
            state.authenticate = false
            state.errorMessage = payload.error
        },
        [user_login.fulfilled]: (state, { payload }) => {
            state.loader = false
            state.authenticate = true
            state.successMessage = payload.message
            state.token = payload.token
            state.userInfo = payload.userInfo
        }

    }
});


export const { messageClear } = authReducer.actions;
export default authReducer.reducer;