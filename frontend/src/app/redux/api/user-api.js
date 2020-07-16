import Config from "../../config";
import Axios from "axios";


const authenticateUser = (body) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };

  return Axios.post(Config._API + "/login", body) .then((user) => {
    localStorage.setItem("taskUser", user.data.token);
  })
};

const registerUser = (body) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };

  return Axios.post(Config._API + "/register", body) .then((user) => {
   
  })
};


export default {
    authenticateUser,
    registerUser
  };
