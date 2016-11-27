import React from 'react'
import UserView from '../components/UserView'
import OtherUsersView from '../components/OtherUsersView'
import {Socket} from 'phoenix'

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

export default class Room extends React.Component {
  constructor(props) {
    super(props)
    this.state = {users: []}
  }

  componentWillMount() {
    const socket = new Socket("/socket", {})
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
    let channel = this.fetchChannel(socket)

    channel.join()
           .receive("ok", resp => {console.log("Joined channel")})
           .receive("error", resp => {console.log("Unable to join channel")})

    return channel
  }

  fetchChannel(socket) {
    const stored_user_id = localStorage.getItem('user_id')

    if (stored_user_id) {
      return socket.channel(this.channelName(), {user_id: stored_user_id})
    } else {
      return socket.channel(this.channelName(), {})
    }
  }

  channelName() {
   return "room:${this.props.params.roomId}"
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
    return (
      <div>
        <OtherUsersView />
        <UserView />
      </div>
    );
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
