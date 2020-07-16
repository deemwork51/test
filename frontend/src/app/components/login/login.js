import React, { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/user-actions";
import { bindActionCreators } from "redux";
import { ToastContainer, toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            Password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {

    }

    handleChange(e) {
        if (e.target.name == 'name') {
            this.setState({ username: e.target.value })
        }
        else {
            this.setState({ password: e.target.value })
        }
    }

    async handleSubmit(e) {
        var self = this;
        e.preventDefault();
        const { username, password } = this.state
        var data = { "username": username, "password": password }
        if(username=='' ||username == undefined|| password == '' ||password==undefined){
            toast.error( 'Username/Password cant be Empty', {
                position: toast.POSITION.BOTTOM_CENTER
            })
            return ;
        }
        await this.props.authenticateUser(data)
        if (this.props.loginMessage != null && this.props.loginMessage != '') {
            toast.error("Invalid Crediatials !", {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        if (this.props.redirect !== "" && this.props.redirect !== undefined) {
            toast.success("Logged In Successfully!", {
                position: toast.POSITION.BOTTOM_CENTER
            })
            setTimeout(function () {
                self.props.history.push('/')
            }, 2000)
        }
        this.setState({username:'',password:''})
    }

    render() {
        if(localStorage.getItem('taskUser')!=null && localStorage.getItem('taskUser')!='' ){
            this.props.history.push('/')
          }
        return (

            <div className="component-Login">
                <div className="top-header-link">
                    No Account Yet ? <Link to ="/register">Sign Up</Link> 
                </div>
                <div className="wrapper">
                    <div className="logo">
                    </div>
                    <p className="page-heading">Sign In Here</p>
                    <p className="option-text">Use Your Email To Sign In</p>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-input">
                            <input type="text" placeholder="Email" value={this.state.username} name="name" onChange={this.handleChange}></input>
                        </div>
                        <div className="form-input">
                            <input type="password" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange}></input>
                        </div>
                        <div className='form-bottom'>
                            <p><input type="submit" value="Log In" data-test="submit" /></p>
                        </div>

                    </form>
                    <ToastContainer autoClose={5000} />
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        redirect: state.user.redirect,
        loginMessage: state.user.loginMessage
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ...userActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, null, { ref: true })(Login);




