import React from 'react'
import { connect } from 'react-redux'

const OtherEstimate = ({
  name,
  optimistic,
  realistic,
  pessimistic
}) => {
  return (
    <div>
      <label>{name}</label>
      <input type="number" value={optimistic} placeholder="realistic" disabled />
      <input type="number" value={realistic} placeholder="realistic" disabled />
      <input type="number" value={pessimistic} placeholder="pessimistic" disabled />
    </div>
  )
}

let OtherUsersView = ({users}) => {
  return (
    <div>
    {users.map(user => <OtherEstimate
                         key={user.name}
                         {...user} />)}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {users: state.users.filter(u => !u.logged_in_user)}
}

OtherUsersView = connect(mapStateToProps)(OtherUsersView)
export default OtherUsersView
