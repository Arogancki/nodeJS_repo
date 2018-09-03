import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import { MoonLoader } from 'react-spinners'
import Cookies from 'universal-cookie'

import actionTypes from "../actions/types"
import actionFactory from "../actions/actionFactory"
import statuses from "../lib/statuses"
import Dashboard from "./Dashboard/index"
import SignIn from "./SignIn"

const cookies = new Cookies()

@connect(mapStateToProps, mapDispatchToProps)
export default class Layout extends React.Component {
  componentDidMount(){
    const status = this.props.ciscosparkReducer.registrationStatus.status
    if (status !== statuses.DONE){
      const accesToken = cookies.get('accesToken')
      if (accesToken){
        this.props.actions.newAccesToken(accesToken)
      }
    }
  }
  render(){
    const status = this.props.ciscosparkReducer.registrationStatus.status
    switch (status) {
      case statuses.REJECTED:
      case statuses.READY: {
        return <SignIn 
          status={status} 
          info={this.props.ciscosparkReducer.registrationStatus.info}
          signIn={this.props.actions.newAccesToken.bind(this)}/>
      }
      case statuses.PENDING: {
        return <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <MoonLoader color={'rgb(0, 195, 255)'} />
        </div>
      }
      case statuses.DONE: {
        return <Dashboard 
          call={this.props.actions.call.bind(this)} 
          callStatus={this.props.ciscosparkReducer.callStatus}
          logout={(e)=>this.props.actions.newAccesToken('')}
          spark={this.props.ciscosparkReducer.spark}
        />
      }
      default: {
        throw new Error('UNKNOWN STATUS');
      }
  }
  }
}

function mapStateToProps(state) {
  return {
    ...state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      newAccesToken: actionFactory(actionTypes.ACCES_TOKEN_GIVEN),
      call: actionFactory(actionTypes.OUTCOMING_CALL),
    }, dispatch)
  }
}