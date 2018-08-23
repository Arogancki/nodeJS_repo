import React from "react"
import { Link } from "react-router-dom"

import * as styles from "./styles"
import { statusIcon } from "../helper"

export default class Board extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
    this.selectTask = this.selectTask.bind(this);
  }
  selectTask(task){
    console.log("task changed");
  }
  render() {
    return <div style={styles.flexColumn}>
      <div style={{...styles.flexRow, ...styles.text1}}>
        <Link class="elementButton" to="/app" style={{flexBasis:"10%"}}>
          🔙
        </Link>
        <div style={{flexBasis:"80%"}}>
          {this.props.name}{ !this.props.owned && ` (${this.props.owner}'s)`}
        </div>
        <div style={{ flexBasis:"10%"}}/>
      </div>
      {
        this.props.tasks && this.props.tasks.length ?
        <div style={{padding:"2% 2% 2% 2%"}}>
          <div style={{...styles.flexRow, ...styles.text6, textDecoration:"underline", textAlign:"left"}}>
            <div style={{flexBasis:"10%"}}>
            </div>
            <div style={{flexBasis:"45%"}}>
              task
            </div>
            <div style={{flexBasis:"45%"}}>
              submiter
            </div>
          </div>
          {this.props.tasks.map((v,k)=>{
            return <div key={k} class="elementButton" onClick={()=>this.selectTask(v)} style={{...styles.flexRow, ...styles.text4, textAlign:"left"}}>
              <div style={{flexBasis:"10%", textAlign:"center"}}>
                {statusIcon(v.statuses[v.statuses.length-1].type)}
              </div>
              <div style={{flexBasis:"45%"}}>
                {v.name}
              </div>
              <div style={{flexBasis:"45%"}}>
                {v.statuses[0].user}
              </div>
            </div>
          })} 
        </div>
        : 
        <div style={styles.text2}>
            There's no tasks
        </div>
      }
    </div>
  }
}