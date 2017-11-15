import set from 'lodash/fp/set'

import {
  createActionCreator,
  createActionReducer,
  composeAllReducers
} from '../../../Redux/Friends'

const SET_CONNECTED_USERS = 'SET_CONNECTED_USERS'

export const setConnectedUsers = createActionCreator(
  SET_CONNECTED_USERS,
  newConnectedUsers => ({ newConnectedUsers })
)

const setConnectedUsersReducer = createActionReducer(
  SET_CONNECTED_USERS,
  ({ newConnectedUsers }) => set('connectedUsers', newConnectedUsers)
)

export const setConnectedUsersReducers = composeAllReducers([
  setConnectedUsersReducer
])
