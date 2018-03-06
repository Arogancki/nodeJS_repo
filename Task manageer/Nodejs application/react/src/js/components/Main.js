import React from "react"

import { Route } from 'react-router-dom'

import SignIn from "./SignIn"
import SignUp from "./SignUp"
import App from "./App"
import Settings from "./Settings"
export default class Main extends React.Component {
  constructor(props){
    super(props);
    
    //this.props.history.push('./app');
  }
  // //router na spiner tuej pod /
  render() {
    return <div>
      <Route path="/sign/up" component={SignUp}/>
      <Route path="/sign/in" component={SignIn}/>
      <Route path="/app/settings" component={Settings}/>
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