import React from 'react'
import UserRegisterForm from 'web/static/js/components/UserRegisterForm'
import {Socket} from "phoenix"

function OtherEstimate(props) {
  return (
    <div>
      <label>{props.name}</label>
      <input type="number" placeholder="optimistic" disabled/>
      <input type="number" placeholder="realistic" disabled/>
      <input type="number" placeholder="pessimistic" disabled/>
      <input type="submit" disabled value="Waiting.."/>
    </div>
  )
}

function UserEstimates(props) {
  return (
    <div>
      <label>{props.name}</label>
      <input type="number" placeholder="optimistic"/>
      <input type="number" placeholder="realistic"/>
      <input type="number" placeholder="pessimistic"/>
      <input type="submit" value="Estimate" />
    </div>
  )
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {users: []}
  }

  componentWillMount() {
    let socket = new Socket("/socket", {})
    socket.connect()

    let channel = this.joinChannel(socket)

    channel.on("logged_in", ({username, user_id}) => {
      this.setState({username: username,
                     user_id: user_id})
    })

    channel.on("new_user", ({username}) => {
      this.addNewUser(username)
    })

    this.setState({channel: channel})
  }

  joinChannel(socket) {
    let channel = fetchChannel(socket)

    channel.join()
           .receive("ok", resp => {console.log("Joined channel")})
           .receive("error", resp => {console.log("Unable to join channel")})

    return channel
  }

  addNewUser(username) {
    this.setState({users: this.state.users.concat(username)})
  }

  render() {
    return (
      <div>
        <h1>Story Name</h1>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.  Donec hendrerit tempor tellus.  Donec pretium posuere tellus</p>
        {this.renderUsers()}
        {this.renderLoggedInUser()}
      </div>
    )
  }

  renderUsers() {
    const renderedUsers = this.state.users.map(this.renderUser)
    return (
      <div>
        {renderedUsers}
      </div>
    )
  }

  renderUser(name) {
    return (
      <OtherEstimate key={name} name={name} />
    )
  }

  renderLoggedInUser() {
    if (this.state.username) {
      return(
        <UserEstimates name={this.state.username} />
      )
    } else {
      return(
        <UserRegisterForm handleRegister={this.handleNewUser.bind(this)}/>
      )
    }
  }

  handleNewUser(username) {
    this.state.channel.push("register", {username: username})
        .receive("ok", ({user_id}) => this.logNewUserIn(username, user_id))
        .receive("error", (reply) => console.log(reply))
  }

  logNewUserIn(username, user_id) {
    localStorage.setItem("user_id", user_id)
    this.setState({username: username,
                   user_id: user_id})
  }
}

function fetchChannel(socket) {
  const stored_user_id = localStorage.getItem('user_id')

  if (stored_user_id) {
    return socket.channel("room:lobby", {user_id: stored_user_id})
  } else {
    return socket.channel("room:lobby", {})
  }
}
