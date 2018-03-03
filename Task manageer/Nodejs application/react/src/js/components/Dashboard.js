import React from "react"

import { Route } from 'react-router-dom'

import * as styles from "./styles"
import Welcome from "./Welcome"
import Board from "./Board"
import Task from "./Task"

export default class App extends React.Component {
  render() {
    return <div>
      <Route path="/app/" component={Welcome}/>
      {
        // path to board
      }
      <Route path="/" component={Board}/>
      {
        // path to task
      }
      <Route path="/" component={Task}/>
    </div>
  }
}