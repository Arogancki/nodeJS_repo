import React from "react"
import Cookies from 'js-cookie'

import { Route } from 'react-router-dom'

import * as styles from "./styles"
import Welcome from "./Welcome"
import Board from "./Board"
import Task from "./Task"

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
  }
  render() {
    let board = this.props.board;
    let login = this.props.user;
    return <div>
      <Route exact path="/app/" component={React.createClass({
        render: function(){
          return (
            <Welcome name={login}/>
          );
        }
      })}/>
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