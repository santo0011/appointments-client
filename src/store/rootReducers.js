import adminReducer from "./Reducers/adminReducer";
import authReducer from "./Reducers/authReducer";
import doctorReducer from "./Reducers/doctorReducer";
import userReducer from "./Reducers/userReducer";


const rootReducer = {
    auth: authReducer,
    user: userReducer,
    admin: adminReducer,
    doctor:doctorReducer
}

export default rootReducer;