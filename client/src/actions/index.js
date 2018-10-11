import axios from "axios";
import { FETCH_USER } from "./types";

/*
export const fetchUser = () => {
  return function(dispatch) {
    axios
      .get("/api/current_user")
      //after request is completed, send it to reducer
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};

*/
//retrieve current user from emaily API
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  //after request is completed, send it to reducer
  dispatch({ type: FETCH_USER, payload: res.data });
};

//handle Stripe Token
export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

//Submit Email Survey to backend
export const submitSurvey = (values,history) => async dispatch => {
  //perfom a post request to api/surveys
  const res = await axios.post("/api/surveys", values);

  history.push('/surveys');
  return { type: "submit_survey" };
};
