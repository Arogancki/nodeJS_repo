import React from "react"
import { Route } from "react-router-dom"
import Cookies from 'js-cookie'

import * as styles from "./styles"
import { validator } from "../helper"
import Form from "./Form.js"
import {Generic, GenericButton, GenericLinkButton} from "./Generic"
import axios from 'axios'


let labelStyle = {...styles.text4, textAlign:"center", width:"50%", margin: "1%"};
let inputStyle = {...styles.text6, textAlign:"center", width:"50%", margin: "2%"};
export default class SignIn extends React.Component {
  constructor(props) {
    Cookies.remove('login');
    Cookies.remove('password');
    localStorage.removeItem("login");
    localStorage.removeItem("password");
    super(props);
    this.set = this.set.bind(this);
    this.reset = this.reset.bind(this);
    this.signIn = this.signIn.bind(this);
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
      }
    };
  }
  reset(e){
    axios.post('/resetpassword', {
      login: this.state.login.value,
      email: this.state.email.value
    }).then((res)=>{
      alert("If email is correct, link to reset your password will be send.");
    }, (err)=>{
      alert("If email is correct, link to reset your password will be send.");
    });
  }
  signIn(e){
    axios.post('/authorization', {
      login: this.state.login.value,
      password: this.state.password.value
    }).then((res)=>{
      Cookies.set("login", this.state.login.value, { expires: 1 });
      Cookies.set("password", this.state.password.value, { expires: 1 });
      localStorage.setItem('login', this.state.login.value);
      localStorage.setItem('password', this.state.password.value);
      this.props.history.push("/app");
    }, (err)=>{
      alert(err.response.data);
    });
  }
  set(props){
    this.state[props.label.toLowerCase()] = { ...this.state[props.label.toLowerCase()], ...props};
    this.setState(this.state);
  }
  render() {
    return <div style={{...styles.flexColumn, width:"100%", alignItems: 'center', justifyContent:'center'}}>
        <Form { ...this.state.login }/>
        <Route exact path="/sign/in"
        component={()=><Form { ...this.state.password }/>} />
        <Route exact path="/sign/in/reset" 
        component={()=><Form { ...this.state.email }/>} />
        <Route exact path="/sign/in" component={()=>(<Generic { ...{
            state: {
              child: [
                [
                  <div key={0} style={labelStyle}>{GenericLinkButton("I don't remember", "/sign/in/reset", styles.button)}</div>,
                  this.state.login.valid && this.state.password.valid ?
                  <div key={1} style={labelStyle}>{GenericButton("Sign In", styles.button, this.signIn)}</div>
                  : 
                  <div key={1} style={{...labelStyle, ...styles.inactive, display:"block", ...styles.button}}>Sign In</div>
                ]
              ],
              style: {...styles.flexRow, width:"50%"},
            }
          }
        } />)}/>
        <Route path="/sign/in/reset" component={()=>(<Generic { ...{
            state: {
              child: [
                [
                  <div key={0} style={labelStyle}>{GenericLinkButton("I remember", "/sign/in", styles.button)}</div>,
                  this.state.login.valid && this.state.email.valid ?
                  <div key={1} style={labelStyle}>{GenericButton("Send a new password", styles.button, this.reset)}</div>
                  : 
                  <div key={1} style={{...labelStyle, ...styles.inactive}}>Send a new password</div>
                ]
              ],
              style: {...styles.flexRow, width:"50%"},
            }
          }
        }/>)}/>
        <div style={labelStyle}>
          {this.state.login.touched && !this.state.login.valid && "Invalid login!"}
        </div>
        <Route exact path="/sign/in" component={()=><div style={labelStyle}>
            {this.state.password.touched && !this.state.password.valid && "Invalid password!"}
            </div>}/>
        <Route path="/sign/in/reset" component={()=><div style={labelStyle}>
            {this.state.email.touched && !this.state.email.valid && "Invalid email!"}
          </div>}/>
    </div>
  }
}