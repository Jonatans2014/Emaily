//Combine it with combine reducers call
import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";

import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm
});
