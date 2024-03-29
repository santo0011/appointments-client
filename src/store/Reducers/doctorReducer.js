import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";


// get_apply_appointments
export const get_apply_appointments = createAsyncThunk(
    "doctor/get_apply_appointments",
    async ({ searchValue, page, parPage, id }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-apply-appointments?searchValue=${searchValue}&&page=${page}&&parPage=${parPage}&&id=${id}`);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


// approve_book_status
export const approve_book_status = createAsyncThunk(
    "doctor/approve_book_status",
    async (obj, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/approve-book-status`, obj);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);




export const doctorReducer = createSlice({
    name: "doctor",
    initialState: {
        errorMessage: "",
        successMessage: "",
        loader: false,
        requestAppointmets: [],
        requestAppointmetCount: 0
    },
    reducers: {
        messageClear: (state, _) => {
            state.successMessage = "";
            state.errorMessage = "";
        },
    },
    extraReducers: {
        [get_apply_appointments.pending]: (state, _) => {
            state.loader = true;
        },
        [get_apply_appointments.rejected]: (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error;
        },
        [get_apply_appointments.fulfilled]: (state, { payload }) => {
            state.loader = false;
            state.requestAppointmets = payload.requestAppointmets;
            state.requestAppointmetCount = payload.requestAppointmetCount;
        },
        [approve_book_status.pending]: (state, _) => {
            state.loader = true;
        },
        [approve_book_status.rejected]: (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error;
        },
        [approve_book_status.fulfilled]: (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message
        }

    },
});



export const { messageClear } = doctorReducer.actions;
export default doctorReducer.reducer;
