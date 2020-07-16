import React, { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/user-actions";
import { bindActionCreators } from "redux";
import { ToastContainer, toast } from 'react-toastify';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            Password:''
        }
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }

    componentDidMount() {

    }

    handleChange(e){
        if(e.target.name=='name'){
            this.setState({username:e.target.value})
        }
        else{
            this.setState({password:e.target.value})
        }
    }

    async handleSubmit(e){
        e.preventDefault();
        const {username,password}=this.state
        if(username=='' ||username == undefined|| password == '' ||password==undefined){
            toast.error( 'Username/Password cant be Empty', {
                position: toast.POSITION.BOTTOM_CENTER
            })
            return ;
        }
        var data ={"username":username,"password":password}
        await this.props.registerUser(data)
        if (this.props.registerMessage != null && this.props.registerMessage != '') {
            toast.error( this.props.registerMessage, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        else{
            this.props.history.push('login')
        }
        this.setState({username:'',password:''})
       
     }

    render() {

        if(localStorage.getItem('taskUser')!=null && localStorage.getItem('taskUser')!='' ){
            this.props.history.push('/')
          }
        return (

            <div className="component-Login">
                <div className="wrapper">
                    <div className="logo">
                    </div>
                    <p className="page-heading">Sign Up Here</p>
                    <p className="option-text">Use Your Email To Sign Up</p>
                    
                        <form onSubmit={this.handleSubmit}> 
                        <div className="form-input">
                            <input type="text" placeholder="Email" value={this.state.username} name="name" onChange={this.handleChange}></input>
                            </div>
                        <div className="form-input">    
                            <input type="password" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange}></input>
                        </div>    
                        <div className='form-bottom'>
                    <p><input type="submit" value="Sign Up" data-test="submit" /></p>
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
      redirect:state.user.redirect,
      registerMessage:state.user.registerMessage
    };
  }
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ...userActions }, dispatch);
  }
  
export default connect(mapStateToProps,mapDispatchToProps,null,{ ref: true }) (Register);
  
  
  

