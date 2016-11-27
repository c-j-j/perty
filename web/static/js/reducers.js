import { combineReducers } from 'redux'

const initialUsersState = [
  {
    id: 1,
    name: 'John',
    optimistic: 1,
    realistic: 2,
    pessimistic: 3
  },
  {
    id: 2,
    name: 'Terry',
    optimistic: 2,
    realistic: 4,
    pessimistic: 6
  }
]

const updateEstimateFoo = (previousUsers, action, estimateLevel) => {
  const findUser = previousUsers.find(u => u.logged_in_user)
  const updatedUser = Object.assign({}, findUser, {[estimateLevel]: action.estimate})
  return previousUsers.map(user => user.id === findUser.id ? updatedUser : user)
}

const updateEstimate = (previousUsers, action) => {
  switch (action.estimate_level) {
    case 'optimistic':
      return updateEstimateFoo(previousUsers, action, 'optimistic')
    case 'realistic':
      return updateEstimateFoo(previousUsers, action, 'realistic')
    case 'pessimistic':
      return updateEstimateFoo(previousUsers, action, 'pessimistic')
    default:
      return previousUsers
  }
}

const users = (previousUsers = initialUsersState, action) => {
  switch (action.type) {
    case 'LOG_USER_IN':
      return previousUsers.concat(
        {
          name: action.name,
          logged_in_user: true,
          id: -1
        }
      )
    case 'UPDATE_ESTIMATE':
      return updateEstimate(previousUsers, action)
    default:
      return previousUsers
  }
}

const Reducer = combineReducers({users})

export default Reducer
