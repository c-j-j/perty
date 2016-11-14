import React from 'react'

export default class UserRegisterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  render() {
    return(
      <form onSubmit={this.handleRegister.bind(this)}>
        <input type="text" value={this.state.name} placeholder="Enter name" onChange={this.handleNameChange.bind(this)}/>
        <input type="submit" value="Enter room" />
      </form>
    )
  }

  handleNameChange(event) {
    this.setState({name: event.target.value})
  }

  handleRegister(event) {
    event.preventDefault()

    this.props.handleRegister(this.state.name)
    this.setState({name: ''})
  }
}

