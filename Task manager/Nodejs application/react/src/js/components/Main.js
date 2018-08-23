import React from "react"
import Cookies from 'js-cookie'
import { Route } from 'react-router-dom'

import SignIn from "./SignIn"
import SignUp from "./SignUp"
import App from "./App"
import Settings from "./Settings"
import axios from 'axios'

export default class Main extends React.Component {
  constructor(props){
    super(props);
    let login = Cookies.get("login");
    let password = Cookies.get("password");

     login = localStorage.getItem('login');
     password =  localStorage.getItem('password');
     
    this.state = { login };
    if (login && password){
      axios.post('/authorization', {
        login: login,
        password: password
      }).then((res)=>{
        this.props.history.push('./app');
      }, (err)=>{
        Cookies.remove("login");
        Cookies.remove("password");
        localStorage.removeItem("login");
        localStorage.removeItem("password");
        console.log(err);
        this.props.history.push('./sign/in');
      })
    }
    else{
      setTimeout(()=>this.props.history.push('./sign/in'),0);
    }
  }
  render() {
    let login = this.state.login;
    return <div>
      <Route path="/sign/up" component={SignUp}/>
      <Route path="/sign/in" component={SignIn}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/app" component={App}/>
      <Route exact path="/" component={React.createClass({
        render: function(){
          return (
            <App user={login} history={this.props.history}/>
          );
        }
      })}/>
      <Route exact path="/" component={React.createClass({
        render: function(){
          return (
            <div class="loader"/>
          );
        }
      })}/>
      </div>
  }
}