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
import React from 'react'
import { browserHistory  } from 'react-router'
import * as Api from '../api'

export default class NewRoom extends React.Component {
  componentWillMount() {
    this.setState({title: ''})
  }

  render() {
    return (
      <div>
        <h1>Create A New Room</h1>
        <form onSubmit={this.createNewRoom.bind(this)}>
          <input type="text" value={this.state.title} onChange={this.updateTitle.bind(this)} placeholder="Room Title" />
          <input type="submit" value="Create Room" />
        </form>
      </div>
    )
  }

  updateTitle(event) {
    this.setState({title: event.target.value})
  }

  createNewRoom(event) {
    event.preventDefault()

    Api.createNewRoom({title: this.state.title})
         .then(({data}) => redirectToNewRoom(data.id))
         .catch((error) => console.log(`Error occurred when creating room: ${error}`))
  }
}

function redirectToNewRoom(roomId) {
  browserHistory.push(`/rooms/room/${roomId}`)
}
