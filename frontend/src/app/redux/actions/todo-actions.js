import { Types } from "../constants/todo-types";
import API from "../api/todo-api";



export function addTodo(body) {
  return async function (dispatch, getState) {
    await API.addTodo(body).then(
        (message) => {
          dispatch({ type: Types.ADD_TODO, payload: 'success'});
        },
      );
      await API.getTodo().then(
        (todo) => {
          dispatch({ type: Types.GET_TODO, payload:todo.data.response });
        },   
    );
  };
}

export function getTodo() {
  return async function (dispatch, getState) {
    await API.getTodo().then(
        (todo) => {
          dispatch({ type: Types.GET_TODO, payload:todo.data.response });
        },
        );
  };
}


export function updateTodo(data,id) {
  return async function (dispatch, getState) {
    await API.updateTodo(data,id).then(
        (message) => {
          dispatch({ type: Types.UPDATE_TODO, payload: 'success'});
        },
      );
      await API.getTodo().then(
        (todo) => {
          dispatch({ type: Types.GET_TODO, payload:todo.data.response });
        },   
    );
  };
}


export function reorderTodo(fromTodoId, toTodoId) {
  return async function (dispatch, getState) {
      await API.reorderTodo(fromTodoId, toTodoId).then(
          (isSuccess) => {
              dispatch({ type: Types.REORDER_TODO, payload: isSuccess });
          },
          (error) => {
          }
      );

      await API.getTodo().then(
        (todo) => {
          dispatch({ type: Types.GET_TODO, payload:todo.data.response });
        },   
    );
  }
}


export function showAddTodoModal(row) {
    return async function (dispatch, getState) {
     dispatch({ type: Types.SHOW_ADD_TODO_MODAL, payload: true});
     dispatch({ type: Types.TODO_DATA, payload:row});
    }
  }
  


  export function hideAddTodoModal() {
    return async function (dispatch, getState) {
     dispatch({ type: Types.HIDE_ADD_TODO_MODAL, payload: false});
    }
  }
  




