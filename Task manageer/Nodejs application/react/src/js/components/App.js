import React from "react"
import * as styles from "./styles"

import Dashboard from "./Dashboard"
import Boards from "./Boards"
import Members from "./Members"

let boards = [
  {
    name: "first board",
    owner: "Alice",
    owned: false
  },
  {
    name: "second board",
    owner: "ignore",
    owned: true
  }
]

let invitations = [
  {
    board: "first board",
    owner: "Alice",
  },
  {
    board: "second board",
    owner: "Bob",
 }
]

export default class App extends React.Component {
  render() {
    return <div class="main" style={{...styles.flexRow}}>
      <Boards boards={boards} invitations={invitations}/>
      <Dashboard/>
      <Members/>
    </div>
  }
}