import React from "react"

import { Route } from 'react-router-dom'

import SignIn from "./SignIn"
import SignUp from "./SignUp"
import App from "./App"
import Settings from "./Settings"

export default class Main extends React.Component {
  render() {
    return <div>
      <Route path="/sign/up" component={SignUp}/>
      <Route path="/sign/in" component={SignIn}/>
      <Route path="/app/settings" component={Settings}/>
      <Route path="/" component={App}/>
    </div>
  }
}