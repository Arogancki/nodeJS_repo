import { applyMiddleware, createStore } from "redux"

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from "./reducers"

const asyncDispatchMiddleware = store => next => action => {
    let syncActivityFinished = false;
    let actionQueue = [];
  
    function flushQueue() {
      actionQueue.forEach(a => store.dispatch(a)); // flush queue
      actionQueue = [];
    }
  
    function asyncDispatch(asyncAction) {
      actionQueue = actionQueue.concat([asyncAction]);
  
      if (syncActivityFinished) {
        flushQueue();
      }
    }
  
    const actionWithAsyncDispatch =
        Object.assign({}, action, { asyncDispatch });
  
    next(actionWithAsyncDispatch);
    syncActivityFinished = true;
    flushQueue();
  };

const middleware = applyMiddleware(promise(), thunk, logger(), asyncDispatchMiddleware)

export default createStore(reducer, middleware)
