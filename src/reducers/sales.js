import { combineReducers } from "redux";
import { LOG_OUT } from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import summarySalesUpReducer from "../modules/summarySalesUp/summarySalesUpReducer";
import summarySalesReducer from "../modules/summarySales/summarySalesReducer";
import summarySalesRoomReducer from "../modules/summarySalesRoom/summarySalesRoomReducer";
import studentReducer from "../modules/infoStudent/studentReducer";
import createRegister from "../modules/registerStudents/createRegisterReducer";
import targetSaleReducer from "../modules/sales/targetSaleReducer";

const appReducer = combineReducers({
    ...commonReducer,
    summarySalesUp: summarySalesUpReducer,
    summarySalesRoom: summarySalesRoomReducer,
    summarySales: summarySalesReducer,
    infoStudent: studentReducer,
    createRegister,
    targetSale: targetSaleReducer
});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
