import React from "react"
import * as styles from "./styles"

import { validator } from "../helper"
import Form from "./Form.js"
import {Generic, GenericButton} from "./Generic"
import axios from 'axios'

let labelStyle = {...styles.text4, textAlign:"center", width:"50%", margin: "1%"};
let inputStyle = {...styles.text6, textAlign:"center", width:"50%", margin: "2%"};
export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
    this.set = this.set.bind(this);
    this.state = {
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
  change(e){
    let body = {};
    this.state.password.valid && this.state["confirm password"].valid && (body.password = this.state.password.value);
    this.state.password.valid && (body.newEmail = this.state.newEmail.value);
    axios.post('/changeUserData', body).then((res)=>{
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
    let buttonLabel='';
    if (this.state.password.valid 
    && this.state.password.value === this.state["confirm password"].value){
        buttonLabel = "Change password";
    }
    if (this.state.email.valid){
        buttonLabel += buttonLabel ? " and email" : "Change email";
    }
    let x = GenericButton(buttonLabel, styles.button, this.change);
    return <div style={{...styles.flexColumn, width:"100%", alignItems: 'center', justifyContent:'center'}}>
        <Form { ...this.state.password }/>
        <Form { ...this.state["confirm password"] }/>
        <Form { ...this.state.email }/>
        <div style={labelStyle} onClick={this.change}>
            {buttonLabel && <div class={"elementButton"}>{buttonLabel}</div> || "What you what to change?"}
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