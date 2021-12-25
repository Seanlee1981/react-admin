import React, {Component} from 'react';
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"



class Login extends Component {
    constructor(){
        super();
        this.state = {
            //指示默认的form 是 login；
            formType: "login"
        };
    }
    switchForm =(value) => {
        this.setState({
            formType: value
        })
    }
    
    render(){
        return(
            <div className="form-wrap">
                <div>  
                    { 
                    this.state.formType === 'login' 
                    ? <LoginForm switchForm={this.switchForm}></LoginForm>
                    : <RegisterForm switchForm={this.switchForm}></RegisterForm>
                    }            
                    
                </div>
                
            </div>
        )
    }
}
export default Login;