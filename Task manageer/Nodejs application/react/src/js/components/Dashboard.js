import React from "react"

import { Route } from 'react-router-dom'

import * as styles from "./styles"
import Welcome from "./Welcome"
import Board from "./Board"
import Task from "./Task"

let board = {
  name: "Some Board name",
  owned: false,
  owner: "Gary",
  tasks: [
    {
      name: "Do this verry long nameeeeeeeeeeeee",
      statuses: [
        {
          type: "New",
          user: "Tom with verry long nameeeeeeeeee",
          info: "this need to be done",
          date: "13:13:13" 
        },
        {
          type: "In progress",
          user: "Tom",
          info: "this need to be done",
          date: "13:13:13" 
        },
        {
          type: "Blocked",
          user: "Tom",
          info: "this need to be done",
          date: "13:13:13" 
        },
        {
          type: "Finished",
          user: "Tom",
          info: "this need to be done",
          date: "13:13:13" 
        },
        {
          type: "Resumed",
          user: "Tom",
          info: "this need to be done",
          date: "13:13:13" 
        },
      ]
    },
    {
      name: "Do this too",
      statuses: [
        {
          type: "New",
          user: "Tom",
          info: "this need to be done",
          date: "13:13:13" 
        }
      ]
    }
  ]
}

export default class App extends React.Component {
  render() {
    return <div>
      <Route exact path="/app/" component={Welcome}/>
      <Route path="/app/board" component={React.createClass({
        render: function(){
          return (
            <Board {...board}/>
          );
        }
      })}/>
      <Route path="/app/task" component={React.createClass({
        render: function(){
          return (
            <Task {...board.tasks[0]}/>
          );
        }
      })}/>
    </div>
  }
}