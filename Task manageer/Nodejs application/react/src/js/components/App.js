import React from "react"
import { connect } from "react-redux"

import * as styles from "./styles"
import Dashboard from "./Dashboard"
import Boards from "./Boards"
import Members from "./Members"
import { getBoardsAndInvitations } from "../actions/getBoardsAndInvitations"
import { isOwner } from '../helper'

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

let invited = ["Marry", "Sam", "Kerry", "Elie"];
let members = ["Marry", "Sam", "Kerry", "Elie"];

let owner = {
  owned: true,
  owner: "Gary"
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
let user = null;
@connect((store) => {
  return {
    boards: store.boards,
    invitations: store.invitations,
    active: ~store.boards.active? store.boards[store.boards.active]:[],
    members: ~store.boards.active? store.boards[store.boards.active].members:[],
    invited: ~store.boards.active? store.boards[store.boards.active].invitations:[]
  };
}, null, (stateProps, dispatchProps, ownProps) => {
  user = ownProps.user || user;
  return Object.assign({}, stateProps, dispatchProps, ownProps);
})
export default class App extends React.Component {
  constructor(props){
    super(props);
  }
  componentWillMount() {
    this.props.dispatch(getBoardsAndInvitations());
  }
  render() {
    return <div class="main" style={{...styles.flexRow}}>
      <Boards boards={this.props.boards} invitations={this.props.invitations}/>
      <div style={{width:"50%", borderLeft: "solid 2px #99CCFF", borderRight: "solid 2px #99CCFF"}}>
        <Dashboard user={user} board={this.props.active}/>
      </div>
      <Members members={members} invited={invited} owner={owner.owner} owned={owner.owned}/>
    </div>
  }
}