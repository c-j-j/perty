import React from 'react'
import { connect } from 'react-redux'
import AddUser from 'web/static/js/containers/AddUser'
import Estimates from 'web/static/js/containers/Estimates'

let UserView = ({is_logged_in}) => {
  if (is_logged_in) {
    return (<Estimates />)
  } else {
    return (<AddUser />)
  }
}

const mapStateToProps = (state) => {
  return {
    is_logged_in: state.users.find(u => u.logged_in_user)
  }
}

UserView = connect(mapStateToProps)(UserView)
export default UserView
