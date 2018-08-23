import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Route, HashRouter } from "react-router-dom";

import Layout from "./components/Layout"
import store from "./store"

ReactDOM.render(
  <Provider store={store}> 
    <Layout/>
  </Provider>, 
  document.getElementById('app')
);
