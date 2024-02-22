import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// apply_doctor
export const apply_doctor = createAsyncThunk(
  "user/apply_doctor",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/apply-doctor", info);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get_user_notifications
export const get_user_notifications = createAsyncThunk(
  'user/get_user_notifications',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/get-user-notifications');
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)


// user_mark_all_as_seen
export const user_mark_all_as_seen = createAsyncThunk(
  'user/user_mark_all_as_seen',
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put('/user-mark-all-as-seen', { id });
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)



// delete_all_user_seen_notification
export const delete_all_user_seen_notification = createAsyncThunk(
  'user/delete_all_user_seen_notification',
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put('/delete-user-seenNotifications', { id });
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)



// get_all_doctor
export const get_all_doctor = createAsyncThunk(
  'user/get_all_doctor',
  async ({ searchValue, page, parPage }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-all-doctor?searchValue=${searchValue}&&page=${page}&&parPage=${parPage}`);
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)


// get_doctor_details
export const get_doctor_details = createAsyncThunk(
  "user/get_doctor_details",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-doctor-details/?id=${id}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// update_doctor
export const update_doctor = createAsyncThunk(
  "user/update_doctor",
  async ({ info, id }, { rejectWithValue, fulfillWithValue }) => {

    try {
      const { data } = await api.put(`/update-doctor/${id}`, info);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// check_book_avilabity
export const check_book_avilabity = createAsyncThunk(
  "user/check_book_avilabity",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/check-book-avilabity`, info);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// book_appointment
export const book_appointment = createAsyncThunk(
  "user/book_appointment",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/book-appointment`, info);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// get_appointment
export const get_appointment = createAsyncThunk(
  "user/get_appointment",
  async ({ searchValue, page, parPage }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-appointment?searchValue=${searchValue}&&page=${page}&&parPage=${parPage}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const userReducer = createSlice({
  name: "user",
  initialState: {
    errorMessage: "",
    successMessage: "",
    loader: false,
    userSeenNotifications: [],
    userUnseenNotifications: [],
    userSuccess: "",
    userDoctors: [],
    userDoctorCount: 0,
    doctorDetails: {}
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
      state.userSuccess = ""
    },
  },
  extraReducers: {
    [apply_doctor.pending]: (state, _) => {
      state.loader = true;
    },
    [apply_doctor.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [apply_doctor.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
    },
    [get_user_notifications.fulfilled]: (state, { payload }) => {
      state.userSeenNotifications = payload.userSeenNotifications
      state.userUnseenNotifications = payload.userUnseenNotifications
    },
    [user_mark_all_as_seen.pending]: (state, _) => {
      state.loader = true
    },
    [user_mark_all_as_seen.fulfilled]: (state, { payload }) => {
      state.loader = false
      state.userSuccess = payload.message
    },
    [delete_all_user_seen_notification.fulfilled]: (state, { payload }) => {
      state.loader = false
      state.userSuccess = payload.message
    },
    [get_all_doctor.fulfilled]: (state, _) => {
      state.loader = true
    },
    [get_all_doctor.fulfilled]: (state, { payload }) => {
      state.loader = false
      state.userDoctors = payload.userDoctors
      state.userDoctorCount = payload.userDoctorCount
    },
    [get_doctor_details.pending]: (state, _) => {
      state.loader = true
    },
    [get_doctor_details.fulfilled]: (state, { payload }) => {
      state.loader = false
      state.doctorDetails = payload.doctorDetails
    },
    [update_doctor.pending]: (state, _) => {
      state.loader = true
    },
    [update_doctor.rejected]: (state, { payload }) => {
      state.loader = false
      state.errorMessage = payload.error
    },
    [update_doctor.fulfilled]: (state, { payload }) => {
      state.loader = false
      state.successMessage = payload.message
    },
    [check_book_avilabity.pending]: (state, _) => {
      state.loader = true
    },
    [check_book_avilabity.rejected]: (state, { payload }) => {
      state.loader = false
      state.errorMessage = payload.error
    },
    [check_book_avilabity.fulfilled]: (state, { payload }) => {
      state.loader = false
      state.successMessage = payload.message
    },
    [book_appointment.pending]: (state, _) => {
      state.loader = true
    },
    [book_appointment.rejected]: (state, { payload }) => {
      state.loader = false
      state.errorMessage = payload.error
    },
    [book_appointment.fulfilled]: (state, { payload }) => {
      state.loader = false
      state.successMessage = payload.message
    },
  },
});



export const { messageClear } = userReducer.actions;
export default userReducer.reducer;
