import Pusher from 'pusher-js'

function create (user) {
  Pusher.logToConsole = false

  const socket = new Pusher('ce8ad1b39f01f774730d', {
    cluster: 'us2',
    encrypted: true,
    authEndpoint: 'http://localhost:3100/pusher/auth',
    auth: {
      params: {
        user: user.displayName
      }
    }
  })

  return socket
}

export default create
