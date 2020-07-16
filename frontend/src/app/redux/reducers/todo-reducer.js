import { Types } from "../constants/todo-types";

const initialState = {
};
export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_EVENTS:
      return { ...state, eventData: action.payload };
    case Types.SHOW_ADD_TODO_MODAL:
      return { ...state, isshowModal: action.payload };
    case Types.HIDE_ADD_TODO_MODAL:
      return { ...state, isshowModal: action.payload };
    case Types.TODO_DATA:
        return { ...state, todoModalData: action.payload };
    case Types.GET_TODO:
          return { ...state, todoList: action.payload };

    default:
      return state;
  }
}
