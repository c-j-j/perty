import React from 'react'
import UserRegisterForm from 'web/static/js/components/UserRegisterForm'
import {Socket} from "phoenix"

function OtherEstimates(props) {
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
    this.state = {loggedIn: false}
  }

  componentWillMount() {
    let socket = new Socket("/socket", {})
    socket.connect()
    let channel = socket.channel("room:lobby", {})

    channel.join("Hello")
           .receive("ok", resp => {console.log(resp)})
           .receive("error", resp => {console.log("Unable to connect")})

    channel.on("new_user", payload => {
      console.log("NEW USER");
      console.log(payload)
    })

    channel.on("user_joined", payload => {
      console.log("USER JOINED");
      console.log(payload)
    })
    this.setState({channel: channel})
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
    return (
      <div>
        <OtherEstimates name="John"/>
        <OtherEstimates name="Terry"/>
      </div>
    )
  }

  renderLoggedInUser() {
    if (this.state.loggedIn) {
      return(
        <UserEstimates name="Chris" />
      )
    } else {
      return(
        <UserRegisterForm handleRegister={this.handleNewUser.bind(this)}/>
      )
    }
  }

  handleNewUser(username) {
    this.state.channel.push("new_user", {username: username})
        .receive("ok", (reply) => console.log(reply))
        .receive("error", (reply) => console.log(reply))
  }
}
