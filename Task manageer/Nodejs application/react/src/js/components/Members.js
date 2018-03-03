import React from "react"

import * as styles from "./styles"

export default class Members extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
    this.removeUser = this.removeUser.bind(this);
    this.addUser = this.addUser.bind(this);
  }
  removeUser(user){
    console.log('remove usr ')
  }
  addUser(){
    console.log('add user ')
  }
  render() {
    return <div style={{width:"25%", alignItems: 'center', justifyContent:'center'}}>
    <div style={{...styles.flexRow, padding: "1% 0% 1% 0%"}}>
      <div style={{width: "100%"}}>
      {  this.props.owned ?
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
    </div>
    <div style={{...styles.flexRow, padding: "1% 0% 1% 0%"}}> 
      <span style={{...styles.text5, flexBasis:"20%"}}/>
      <span style={{...styles.text5, flexBasis:"60%"}}>
        {this.props.owner}
      </span>
      <span style={{...styles.text5, flexBasis:"20%"}}>
        👑
      </span>
    </div>
    {
      this.props.members && this.props.members.length && this.props.members.map((v,k)=>
        <div key={k} style={{...styles.flexRow, padding: "1% 0% 1% 0%"}}>
            <span style={{...styles.text5, flexBasis:"20%"}}/>
            <span style={{...styles.text5, flexBasis:"60%"}}>
              {v}
            </span>
            {
              this.props.owned ? 
              <span class="elementButton" onClick={()=>this.removeUser(v)} style={{...styles.text5, flexBasis:"20%"}}>
                {"✗"}
              </span>
              :
              <span style={{...styles.text5, flexBasis:"20%"}}/>
            }
        </div>) 
    }
  </div>
  }
}