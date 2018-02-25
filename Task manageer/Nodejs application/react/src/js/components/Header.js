import React from "react"
import { Route } from 'react-router-dom'

import {Generic, GenericLinkButton} from "./Generic"
import * as styles from "./styles"

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
      [
        {
          text: "Settings ⚙", 
          link: "/app/settings",
        },
        {
          text: "Sign Out 🔚", 
          link: "/sign/in"
        } 
      ].map((v,k)=><div key={k}>{GenericLinkButton(v.text, v.link, styles.button)}</div>)
    ]
  }
};

export default class Header extends React.Component {
  render() {
    return <header style={{...styles.flexRow, width:'100%'}}>
      <div style={{...styles.text1, width:'75%', "paddingLeft":"1%"}}>NodeJS task manager</div>
      <div style={{...styles.flexColumn, width:'25%', ...styles.text5, "textAlign":'center'}}>
          <Route path="/" component={()=>(<Generic { ...RootMenu } />)}/>
          <Route path="/app" component={()=>(<Generic { ...AppMenu }/>)}/>
      </div>
    </header>
  }
}