import axios from 'axios'

export function createNewRoom(data) {
  return axios.post('/api/rooms', {room: data})
              .then(({data}) => data)
}
