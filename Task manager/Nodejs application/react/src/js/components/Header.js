import React from "react"
import { Route } from 'react-router-dom'
import Cookies from 'js-cookie'

import {Generic, GenericLinkButton} from "./Generic"
import * as styles from "./styles"
import { deleteCookie } from "../helper"

let RootMenu = {
  state: {
    child: [
      [
        {
          text: "Sign In ⤦", 
          link: "/sign/in"
        },
        {
          text: "Sign Up 📝", 
          link: "/sign/Up"
        } 
      ].map((v,k)=><div key={k}>{GenericLinkButton(v.text, v.link, styles.button)}</div>)
    ]
  }
};

let AppMenu = {
  state: {
    child: [
      <div key={"0"}>{GenericLinkButton("Settings ⚙", "/settings", styles.button)}</div>,
      <div key={"1"}>{GenericLinkButton("Sign Out 🔚", "/sign/in", styles.button, ()=>{Cookies.remove('login');Cookies.remove('password');})}</div>
    ]
  }
};

let SettingsMenu = {
  state: {
    child: [
      <div key={"0"}>{GenericLinkButton("Go back ⇦", "/app", styles.button)}</div>,
      <div key={"1"}>{GenericLinkButton("Sign Out 🔚", "/sign/in", styles.button)}</div>
    ]
  }
};

export default class Header extends React.Component {
  render() {
    return <header style={{...styles.flexRow, width:'100%'}}>
      <div style={{...styles.text1, width:'75%', "paddingLeft":"1%"}}>NodeJS task manager</div>
      <div style={{...styles.flexColumn, width:'25%', ...styles.text5, "textAlign":'center'}}>
          <Route path="/sign" component={()=>(<Generic { ...RootMenu } />)}/>
          <Route path="/app" component={()=>(<Generic { ...AppMenu }/>)}/>
          <Route path="/settings" component={()=>(<Generic { ...SettingsMenu }/>)}/>
      </div>
    </header>
  }
}