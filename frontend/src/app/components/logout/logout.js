import React, { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/user-actions";
import { bindActionCreators } from "redux";
import { ToastContainer, toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'

class Logout extends Component {
   

   
   
    render() {
        localStorage.setItem('taskUser','') 
       this.props.history.push('/login')
          
        return (

            <div className="component-Login">
                <div className="top-header-link">
                  Logout
                </div></div>
        )
    }
}

export default Logout;







