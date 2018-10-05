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
    const res= await   axios.get("/api/current_user");
     //after request is completed, send it to reducer
    dispatch({ type: FETCH_USER, payload: res.data });
};


export const handleToken = (token) => async dispatch =>
{
    const res = await  axios.post('/api/stripe',token);

    dispatch({ type: FETCH_USER, payload: res.data });
};
