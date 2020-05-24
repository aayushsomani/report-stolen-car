import { combineReducers } from "redux";
import reportsReducer from "./reportsReducer";
export default combineReducers({
    reportsData: reportsReducer
})