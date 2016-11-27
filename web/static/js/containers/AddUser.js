import React from 'react'
import { connect } from 'react-redux'

let AddUser = ({dispatch}) => {
  let input

  return(
    <div>
      <form onSubmit={e => {
          e.preventDefault()
          dispatch({
            type: 'LOG_USER_IN',
            name: input.value
          })
          input.value = ''
        }}>
        <input ref={node => {
            input = node
          }} />
        <button type="submit">
          Come on in
        </button>
      </form>
    </div>
  )
}

AddUser = connect()(AddUser)
export default AddUser
