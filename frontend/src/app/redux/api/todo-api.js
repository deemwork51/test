import Config from "../../config";
import Axios from "axios";



const addTodo = (data) => {

    return Axios.post(Config._API + "/api/todo/add", data);
  };  

const getTodo = () => {

    return Axios.get(Config._API + "/api/todo/get", undefined);
  }; 

const updateTodo = (data,id) => {

    return Axios.put(Config._API + "/api/todo/update/"+id, data);
  }; 


const reorderTodo = (fromTodoId, toTodoId) => {
    return Axios.post(Config._API + "/api/Todo/Reorder/" + fromTodoId + "/" + toTodoId, undefined);
  }
  
  export default {
    addTodo,
    getTodo,
    updateTodo,
    reorderTodo
  };  