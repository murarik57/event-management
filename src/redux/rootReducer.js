import { combineReducers } from "redux";
import eventReducer from "../components/duck/EventReducer";
const rootReducer = combineReducers({
  event: eventReducer,
});

export default rootReducer;
