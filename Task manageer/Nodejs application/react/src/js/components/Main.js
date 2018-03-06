import React from "react"
import Cookies from 'js-cookie'
import { Route } from 'react-router-dom'

import SignIn from "./SignIn"
import SignUp from "./SignUp"
import App from "./App"
import Settings from "./Settings"
import { getCookie } from "../helper"

export default class Main extends React.Component {
  constructor(props){
    super(props);
    setTimeout(()=>this.props.history.push('./sign'), 300);
    //this.props.history.push('./app');
  }
  // //router na spiner tuej pod /
  render() {
    return <div>
      <Route path="/sign/up" component={SignUp}/>
      <Route path="/sign/in" component={SignIn}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/app" component={App}/>
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