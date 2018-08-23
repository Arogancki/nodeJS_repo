import React from "react"

import * as styles from "./styles"

let labelStyle = {...styles.text4, textAlign:"center", width:"50%", margin: "1%"};
let inputStyle = {...styles.text6, textAlign:"center", width:"50%", margin: "2%"};

export default class Form extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          label: props.label || "",
          value: props.value,
          valid: props.valid,
          touched: props.touched,
          type: props.type
      }
    }
    render(){
      window[this.state.label] = this;
      return <div style={{...styles.flexRow, width:"50%"}}>
        <div style={labelStyle}> {this.state.label} </div>
        <input style={inputStyle}
          type={this.state.type || "text"}
          value={this.state.value}
          class={this.props.touched && !this.props.valid ? "inputInvalid" : "input"}
          onChange={(e)=>{
            this.state.value = e.target.value;
            this.setState(this.state);
          }}
          onBlur={(e)=>{
            this.state.touched=true;
            this.state.valid=this.props.validation && this.props.validation(this.state.value);
            this.setState(this.state);
            this.props.onBlur && this.props.onBlur(this.state);
          }}
          />
      </div>
    }
  }