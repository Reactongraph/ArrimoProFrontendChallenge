import { combineReducers } from "redux";

import userReducer from "./users/userReducer";
import eventReducer from "./calendar/eventReducer";

const rootReducer = combineReducers({
  users: userReducer,
  events: eventReducer,
});

export default rootReducer;
