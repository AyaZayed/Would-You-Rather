import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading";

import authedUser from "./authedUserReducer";
import questions from "./questionsReducer";
import users from "./usersReducer";

export default combineReducers({
  loadingBar: loadingBarReducer,
  questions,
  users,
  authedUser,
});
