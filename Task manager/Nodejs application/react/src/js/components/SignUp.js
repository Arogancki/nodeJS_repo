import React from "react"
import Cookies from 'js-cookie'

import * as styles from "./styles"
import { validator } from "../helper"
import Form from "./Form.js"
import {Generic, GenericButton} from "./Generic"
import axios from 'axios'

let labelStyle = {...styles.text4, textAlign:"center", width:"50%", margin: "1%"};
let inputStyle = {...styles.text6, textAlign:"center", width:"50%", margin: "2%"};
export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.set = this.set.bind(this);
    this.state = {
      login: {
        label: "Login",
        value: "",
        valid: false,
        touched: false,
        validation: (v)=>validator.text(v,3,20),
        onBlur: this.set
      },
      email: {
        label: "Email",
        value: "",
        valid: false,
        touched: false,
        validation: (v)=>validator.email(v,3,50),
        onBlur: this.set
      },
      password: {
        label: "Password",
        value: "",
        valid: false,
        touched: false,
        validation: (v)=>validator.text(v,8,50),
        onBlur: this.set,
        type: "password"
      },
      "confirm password": {
        label: "Confirm password",
        value: "",
        valid: false,
        touched: false,
        validation: (v)=>v===this.state.password.value,
        onBlur: this.set,
        type: "password"
      }
    };
  }
  signUp(e){
    axios.post('/registration', {
      login: this.state.login.value,
      password: this.state.password.value,
      password2: this.state["confirm password"].value,
      email: this.state.email.value
    }).then((res)=>{
      Cookies.set("login", this.state.login.value, { expires: 1 });
      Cookies.set("password", this.state.password.value, { expires: 1 });
      this.props.history.push("/app");
    }, (err)=>{
      alert(err.response.data);
    });
  }
  set(props){
    this.state[props.label.toLowerCase()] = { ...this.state[props.label.toLowerCase()], ...props}; 
    if (props.label.toLowerCase() === "password" && this.state["confirm password"].touched){
      if (this.state.password.value !== this.state["confirm password"].value){
          this.state["confirm password"].valid = false;
      }
      else{
          this.state["confirm password"].valid = true;
      }
    }
    this.setState(this.state);
  }
  render() {
    return <div style={{...styles.flexColumn, width:"100%", alignItems: 'center', justifyContent:'center'}}>
        <Form { ...this.state.login }/>
        <Form { ...this.state.password }/>
        <Form { ...this.state["confirm password"] }/>
        <Form { ...this.state.email }/>
        <div style={labelStyle}>{
            this.state.login.valid && this.state.password.valid 
            && this.state.email.valid && (this.state.password.value === this.state["confirm password"].value) ?
            GenericButton("Sign Up", styles.button, this.signUp)
            :
            <div style={{display:"block", ...styles.button, ...styles.inactive, margin: "1%"}}>Sign Up</div>
          }
        </div>
        <div style={labelStyle}>
          {this.state.login.touched && !this.state.login.valid && "Invalid login!"}
        </div>
        <div style={labelStyle}>
          {this.state.password.touched && !this.state.password.valid && "Invalid password!"}
        </div>
        <div style={labelStyle}>
          {this.state["confirm password"].touched && !this.state["confirm password"].valid && "Passwords are different!"}
        </div>
        <div style={labelStyle}>
          {this.state.email.touched && !this.state.email.valid && "Invalid email!"}
        </div>
    </div>
  }
}