import React from "react"
import { connect } from "react-redux"
import Cookies from 'js-cookie'

import * as styles from "./styles"
import Dashboard from "./Dashboard"
import Boards from "./Boards"
import Members from "./Members"
import { getBoardsAndInvitations } from "../actions/getBoardsAndInvitations"
import { setActiveBoardAction } from "../actions/setActiveBoard"
import { isOwner } from '../helper'

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
  //console.warn(store.boards.active);
  return {
    boards: store.boards.boards.map(b=>{
      return {
        owner: b.owner,
        owned: isOwner(b.owner, user),
        name: b.name
      }
    }),
    invitations: store.boards.boards.invitations,
    active: ~store.boards.active? {...store.boards.boards[store.boards.active], 
      owned: isOwner(store.boards.boards[store.boards.active].owner, user)} :[],
    members: ~store.boards.active? store.boards.boards[store.boards.active].members:[],
    invited: ~store.boards.active? store.boards.boards[store.boards.active].invitations:[],
    owner: ~store.boards.active? store.boards.boards[store.boards.active].owner:'',
    owned: ~store.boards.active? isOwner(store.boards.boards[store.boards.active].owner, user):false,
    name: ~store.boards.active? store.boards.boards[store.boards.active].name:'',
  };
}, null, (stateProps, dispatchProps, ownProps) => {
  user = ownProps.user || user;
  return Object.assign({}, stateProps, dispatchProps, ownProps);
})
export default class App extends React.Component {
  constructor(props){
    user = localStorage.getItem('login') || Cookies.get("login");
    super(props);
    this.refresh = this.refresh.bind(this);
    this.setActiveBoard = this.setActiveBoard.bind(this);
  }
  refresh(){
    this.props.dispatch(getBoardsAndInvitations());
  }
  setActiveBoard(key){
    this.props.dispatch(setActiveBoardAction(key));
    this.props.history.push('/app/board');
  }
  componentWillMount() {
    this.props.dispatch(getBoardsAndInvitations());
  }
  render() {
    return <div class="main" style={{...styles.flexRow}}>
      <Boards setActiveBoard={this.setActiveBoard} refresh={this.refresh} boards={this.props.boards} invitations={this.props.invitations}/>
      <div style={{width:"50%", borderLeft: "solid 2px #99CCFF", borderRight: "solid 2px #99CCFF"}}>
        <Dashboard user={user} board={this.props.active}/>
      </div>
      <Members refresh={this.refresh} members={this.props.members} invited={this.props.invited} 
        owner={this.props.owner} owned={this.props.owned} name={this.props.name}/>
    </div>
  }
}