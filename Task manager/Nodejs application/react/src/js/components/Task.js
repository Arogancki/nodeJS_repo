import React from "react"
import { Link } from "react-router-dom"

import * as styles from "./styles"
import { statusIcon } from "../helper"

export default class Task extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
    this.addStatus = this.addStatus.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }
  addStatus(status){
    console.log("status "+status);
  }
  deleteTask(){
    console.log("delete ");
  }
  render() {
    window.t=this.props;
    return <div style={styles.flexColumn}>
      <div style={{...styles.flexRow, ...styles.text1}}>
        <Link class="elementButton" to="/app/board" style={{flexBasis:"16%"}}>
          🔙
        </Link>
        <div class="elementButton" style={{flexBasis:"16%"}}>
          {
            this.props.statuses[this.props.statuses.length-1].type !== "Finished" ?
              <div onClick={()=>this.deleteTask()}>
                ✗
              </div>
            :
              <div onClick={()=>this.addStatus("Finished")}>
                ✔
              </div>
          }
        </div>
        <div style={{flexBasis:"52%"}}>
          {this.props.name}
        </div>
          {
            this.props.statuses[this.props.statuses.length-1].type !== "Finished" ?
            <div style={{...styles.flexRow, flexBasis:"32%"}}>
              <div class="elementButton" onClick={()=>this.addStatus("In Progress")} style={{flexBasis:"50%"}}>
                ➤
              </div>
              <div class="elementButton" onClick={()=>this.addStatus("Blocked")} style={{flexBasis:"50%"}}>
                ⛔
              </div>
            </div>
            :
              <div class="elementButton" onClick={()=>this.addStatus("Resumed")} style={{flexBasis:"32%"}}>
                ♺
              </div>
          }
      </div>
      {
        <div style={{padding:"2% 2% 2% 2%"}}>
          <div style={{...styles.flexRow, ...styles.text6, textDecoration:"underline", textAlign:"left"}}>
            <div style={{flexBasis:"5%"}}>
            </div>
            <div style={{flexBasis:"15%"}}>
              status
            </div>
            <div style={{flexBasis:"45%"}}>
              comment
            </div>
            <div style={{flexBasis:"20%"}}>
              user
            </div>
            <div style={{flexBasis:"15%"}}>
              date
            </div>
          </div>
          {this.props.statuses.map((v,k)=>{
            return <div key={k} style={{...styles.flexRow, ...styles.text8, textAlign:"left", marginBottom:"1%", marginTop:"1%"}}>
              <div style={{flexBasis:"5%", textAlign:"center"}}>
                {statusIcon(v.type)}
              </div>
              <div style={{flexBasis:"15%"}}>
                {v.type}
              </div>
              <div style={{flexBasis:"45%"}}>
                {v.info}
              </div>
              <div style={{flexBasis:"20%"}}>
                {v.user}
              </div>
              <div style={{flexBasis:"15%"}}>
                {v.date}
              </div>
            </div>
          })} 
        </div>
      }
    </div>
  }
}