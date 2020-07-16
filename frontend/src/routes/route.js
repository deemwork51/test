import login from '../app/components/login/login.js'
import Home from '../app/components/home/home'
import Register from '../app/components/register/register'
import Logout from '../app/components/logout/logout'


export default {
  
    routes: [
      {
        path:"/login",
        component: login,
        exact: true
      },
      {
        path:"/",
        component: Home,
        exact: true
      },
      {
        path:"/register",
        component: Register,
        exact: true
      },
      {
        path:"/logout",
        component: Logout,
        exact: true
      },
    ],
  };
  