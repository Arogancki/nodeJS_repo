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

let members = {
  owned: true,
  owner: "Gary",
  members: [
    "Marry", "Sam", "Kerry", "Elie"
  ]
}

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
    return <div class="main" style={{...styles.flexRow}}>
      <Boards boards={boards} invitations={invitations}/>
      <div style={{width:"50%", borderLeft: "solid 2px #99CCFF", borderRight: "solid 2px #99CCFF"}}>
        <Dashboard board={board}/>
      </div>
      <Members {...members}/>
    </div>
  }
}