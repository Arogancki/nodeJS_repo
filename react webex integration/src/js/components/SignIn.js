import React from "react"

import statuses from "../lib/statuses"
import InputField from "./InputField"
import { relative } from "path";

//this.props.signIn

export default class SignIn extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: props.value || ""
    }
  }
    render(){
      return <div style={{width: '100%', height: '100%'}}>
        
        <div style={{color: 'white', height: '15%', display: 'table', width: '96%', padding: '2%',
        textAlign: 'right', fontSize: '5vh'}}>
          WEBEX TEAMS POC
        </div>

        <div style={{width: '100%', height: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <label style={{display: 'flex', width: '40%', }}>
            <p style={{fontSize: '5vh', margin: '2%', width: '50%'}}>Acces token:</p>
            <input style={{width: '50%', color: 'darkgrey', textAlign: 'center', fontSize: '3vh'}} type="text" value={this.state.value} placeholder='token' name='token' onChange={evt => this.setState({...this.state, value: evt.target.value})} />
          </label>
        </div>
        <button class="b1" style={{height: '5%', width: '10%', marginLeft: '45%'}}
        type="button" onClick={ e => this.state.value && this.props.signIn(this.state.value)}>Sign in</button>
      </div>
    }
}

{/* <InputField 
            label="Acces token: "
            submit="Sign in"
            onSubmit={this.props.signIn} 
          /> */}