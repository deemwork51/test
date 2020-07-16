import { Types } from "../constants/user-types";

const initialState = {
  saveUser: {},
  isshowUpdateModal:false,
  getUserInfo:{},
  resetMessage:undefined,
  resetStatus :undefined
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case Types.LOG_IN_USER:
      return { ...state, currUser: action.payload };
    case Types.SET_SIGN_IN_MESSAGE:
      return { ...state, loginMessage: action.payload };
    case Types.REDIRECT:
      return { ...state, redirect: action.payload };
    case Types.SET_REGISTER_IN_MESSAGE:
      return { ...state, registerMessage: action.payload };
    default:
      return state;
  }
}
