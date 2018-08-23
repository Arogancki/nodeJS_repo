import React from "react"
import { BrowserRouter, Route } from "react-router-dom"

import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import * as styles from "./styles"

export default class Layout extends React.Component {
  render(){
    return <BrowserRouter>
      <div style={styles.background}>
        <div style={{minHeight:"88vh", background:"rgba(1, 1, 1, 0.3)"}}>
          <Route path="/" component={Header}/>
          <Route path="/" component={Main}/>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  }
}