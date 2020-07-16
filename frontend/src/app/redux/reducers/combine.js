import { combineReducers } from "redux";
import userReducer from "./user-reducer";
import todoReducer from "./todo-reducer"
const reducers = combineReducers({
  user: userReducer,
  todo:todoReducer
});

export default reducers;
