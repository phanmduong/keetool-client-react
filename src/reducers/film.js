import {combineReducers} from "redux";
import {LOG_OUT} from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import filmReducer from "../modules/ZgroupFilm/filmReducer";
import bookingHistoryReducer from "../modules/ZgroupFilm/bookingHistory/bookingHistoryReducer";
import roomsReducer from "../modules/rooms/roomsReducer";

const appReducer = combineReducers({
    ...commonReducer,
    film: filmReducer,
    rooms: roomsReducer,
    bookingHistory: bookingHistoryReducer,

});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
