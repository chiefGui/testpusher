import { eventChannel } from 'redux-saga'
import { fork, call, take, put } from 'redux-saga/effects'

import { normalizeMembers as normalizePusherMembers } from '../../../Pusher'
import {
  createSocket,
  connectSuccess,
  setConnectedUsers,
  addUserToTheConnectedList,
  removeUserFromTheConnectedList,
  addMessageToMessagesList,
  sendMessageSuccess
} from '..'

/**
 * Connects authencitated user to a presence (that requires authentication) socket.
 * @param  {Object<User>} selfUser
 * @return {Promise}
 */
function connect (user) {
  const CHANNEL_NAME = 'presence-chat'

  return new Promise(resolve => {
    const socket = createSocket(user).subscribe(CHANNEL_NAME)

    resolve(socket)
  })
}

export function * handleIO (user) {
  const socket = yield call(connect, user)

  yield fork(readEvents, socket)
}

function * readEvents (socket) {
  const channel = yield call(subscribeEvents, socket)

  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}

function subscribeEvents (socket) {
  return eventChannel(emit => {
    // When user has connected to the socket successfully
    socket.bind('pusher:subscription_succeeded', ({ members }) => {
      const connectedUsers = normalizePusherMembers(members)

      emit(setConnectedUsers(connectedUsers))
      emit(connectSuccess())
    })

    // When someone else joined the channel
    socket.bind('pusher:member_added', ({ info }) => {
      const { displayName } = info

      emit(addUserToTheConnectedList({ displayName }))
    })

    // When someone else left the channel
    socket.bind('pusher:member_removed', ({ info }) => {
      const { displayName } = info

      emit(removeUserFromTheConnectedList({ displayName }))
    })

    // Subscribe received messages
    socket.bind('user:send_message', ({ user, message }) => {
      emit(addMessageToMessagesList({ user, message }))
      emit(sendMessageSuccess({ user, message }))
    })

    // Returns function with empty object because Pusher is the one
    // handling closing connections.
    return () => ({})
  })
}
