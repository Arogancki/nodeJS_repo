import React from "react"

import * as styles from "./styles"
import {Link} from "react-router-dom"

export default class Members extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
    this.removeUser = this.removeUser.bind(this);
    this.addUser = this.addUser.bind(this);
    this.cancelInvitation = this.cancelInvitation.bind(this);
  }
  cancelInvitation(inv){
    console.log('cancel inv')
  }
  removeUser(user){
    console.log('remove usr ')
  }
  addUser(){
    console.log('add user ')
  }
  render() {
    return <div style={{width:"25%", alignItems: 'center', justifyContent:'center'}}>
    {
    this.props.members.length ?
    <div style={{...styles.flexRow, padding: "1% 0% 1% 0%"}}>
      <div style={{width: "100%"}}>
      {  
        this.props.members.length && this.props.owned ?
        <span class="elementButton" onClick={()=>this.addUser()} style={{...styles.text1, padding: "0% 2% 0% 2%"}}>
          {"+"}
        </span>          
        :
        <span style={{...styles.text1, padding: "0% 2% 0% 2%"}}>
          {" "}
        </span>   
      }
        <span style={{...styles.text2}}>
          {" Members: "}
        </span>
        <span style={{...styles.text1, padding: "0% 2% 0% 2%"}}>
          {" "}
        </span>  
      </div>
    </div>:""
    }
    {
      this.props.owner ?
      <div style={{...styles.flexRow, padding: "1% 0% 1% 0%"}}> 
        <span style={{...styles.text5, flexBasis:"20%"}}/>
        <span style={{...styles.text5, flexBasis:"60%"}}>
          {this.props.owner}
        </span>
        <span style={{...styles.text5, flexBasis:"20%"}}>
        {"👑"}
        </span>
      </div>:""
    }
    {
      this.props.members.map((v,k)=>
        <div key={k} style={{...styles.flexRow, padding: "1% 0% 1% 0%"}}>
            <span style={{...styles.text5, flexBasis:"20%"}}/>
            <span style={{...styles.text5, flexBasis:"60%"}}>
              {v}
            </span>
            {
              this.props.owned ? 
              <span class="elementButton" onClick={()=>this.removeUser(k)} style={{...styles.text5, flexBasis:"20%"}}>
                {"✗"}
              </span>
              :
              <span style={{...styles.text5, flexBasis:"20%"}}/>
            }
        </div>) 
    }
    {
      <div>
      <div style={{...styles.flexRow, padding: "1% 0% 1% 0%"}}>
        <span style={{...styles.text2, width: "100%", marginTop: "2%"}}>
          {" Invited: "}
        </span>
      </div>
      {
      this.props.invited.map((v,k)=>
        <div key={k} style={{...styles.flexRow, padding: "1% 0% 1% 0%"}}>
          {
          this.props.owned ? 
          <span class="elementButton" onClick={()=>this.cancelInvitation(k)} style={{...styles.text5, flexBasis:"100%"}}>
            {v}
          </span> 
          :
          <span style={{...styles.text5, flexBasis:"100%"}}>
            {v}
          </span>
          }
        </div>)
      }
        </div>
    }
  </div>
  }
}