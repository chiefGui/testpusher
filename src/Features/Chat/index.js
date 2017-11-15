import get from 'lodash/fp/get'

import { combineActionReducers } from '../../Redux/Friends'

import {
  connect,
  connectSuccess,
  connectSaga,
  connectReducers
} from './data/connect'

import {
  setConnectedUsers,
  setConnectedUsersReducers
} from './data/setConnectedUsers'

import {
  addUserToTheConnectedList,
  addUserToTheConnectedListReducers
} from './data/addUserToTheConnectedList'

import {
  removeUserFromTheConnectedList,
  removeUserFromTheConnectedListReducers
} from './data/removeUserFromTheConnectedList'

import {
  sendMessage,
  sendMessageSuccess,
  sendMessageReducers,
  sendMessageSaga
} from './data/sendMessage'

import {
  addMessageToMessagesList,
  addMessageToMessagesListReducers
} from './data/addMessageToMessagesList'

import { handleIO } from './data/handleIO'
import createSocket from './sockets/create'

const STATE_KEY = 'chat'
const INITIAL_STATE = {
  isConnecting: false,
  isConnected: false,
  isSendingMessage: false,
  connectedUsers: [],
  messages: []
}

export const selectIsConnecting = get(`${STATE_KEY}.isConnecting`)
export const selectIsConnected = get(`${STATE_KEY}.isConnected`)
export const selectConnectedUsers = get(`${STATE_KEY}.connectedUsers`)
export const selectMessages = get(`${STATE_KEY}.messages`)
export const selectIsSendingMessage = get(`${STATE_KEY}.isSendingMessage`)

const finalReducer = combineActionReducers(INITIAL_STATE, [
  // Connections
  connectReducers,
  setConnectedUsersReducers,
  addUserToTheConnectedListReducers,
  removeUserFromTheConnectedListReducers,

  // Messages
  sendMessageReducers,
  addMessageToMessagesListReducers
])

export {
  // Connections
  connect,
  connectSuccess,
  setConnectedUsers,
  addUserToTheConnectedList,
  removeUserFromTheConnectedList,

  // Messages
  sendMessage,
  sendMessageSuccess,
  addMessageToMessagesList,

  // Realtime
  createSocket,
  handleIO
}

export default function install (installReducer, installSaga) {
  installSaga(connectSaga)
  installSaga(sendMessageSaga)
  installReducer(STATE_KEY, finalReducer)
}
