// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from 'web/static/js/socket'
import ReactDOM from 'react-dom'
import React from 'react'
import Room from 'web/static/js/components/Room'
import Home from 'web/static/js/components/Home'
import NewRoom from 'web/static/js/components/NewRoom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Reducer from './reducers'


import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'

function NoMatch() {
  return (
    <p>Sorry, no such page</p>
  )
}

function Layout(props) {
  return (
    <div>
      <h1>Perty</h1>
      {props.children}
    </div>
  )
}

const logger = createLogger()
const store = createStore(Reducer,
                          applyMiddleware(thunk, promise, logger))

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
        <Route path="rooms">
          <Route path="new" component={NewRoom}/>
          <Route path="room/:roomId" component={Room}/>
        </Route>
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  </Provider>, document.getElementById('root'))
