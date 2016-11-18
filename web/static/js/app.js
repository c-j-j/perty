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
import App from 'web/static/js/components/App'
import Home from 'web/static/js/components/Home'
import NewRoom from 'web/static/js/components/NewRoom'
import { render } from 'react-dom'
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'

function NoMatch(props) {
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

render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="stories">
        <Route path="new" component={NewRoom}/>
        <Route path="/story/:storyId" component={NewRoom}/>
        <Route path="/user/:userId" component={App}/>
      </Route>
      <Route path="/foo" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('root'))
