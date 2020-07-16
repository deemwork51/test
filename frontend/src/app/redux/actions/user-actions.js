import { Types } from "../constants/user-types";
import API from "../api/user-api";



export function authenticateUser(body) {
  return async function (dispatch, getState) {
    await API.authenticateUser(body).then(
      (user) => {
        dispatch({ type: Types.LOG_IN_USER, payload: { user } });
        dispatch({ type: Types.REDIRECT, payload: "/" });
        dispatch({  type: Types.SET_SIGN_IN_MESSAGE, payload: ""});
      },
      (error) => {
        var error= error.response.data.message;
        dispatch({
          type: Types.SET_SIGN_IN_MESSAGE,
          payload: error
        });
      }
    );
  };
}

export function registerUser(body) {
  return async function (dispatch, getState) {
    await API.registerUser(body).then(
      (user) => {
        dispatch({ type: Types.REGISTER_USER,payload:'success'});
        dispatch({  type: Types.SET_REGISTER_IN_MESSAGE, payload: ""});
      },
      (error) => {
        var error= error.response.data.message;
        dispatch({
          type: Types.SET_REGISTER_IN_MESSAGE,
          payload: error
        });
      }
    );
  };
}



