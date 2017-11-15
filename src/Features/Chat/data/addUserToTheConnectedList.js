import set from 'lodash/fp/set'
import concat from 'lodash/fp/concat'

import {
  createActionCreator,
  createActionReducer,
  composeAllReducers
} from '../../../Redux/Friends'

const ADD_USER_TO_THE_CONNECTED_LIST = 'ADD_USER_TO_THE_CONNECTED_LIST'

export const addUserToTheConnectedList = createActionCreator(
  ADD_USER_TO_THE_CONNECTED_LIST,
  newConnectedUser => ({ newConnectedUser })
)

const addUserToTheConnectedListReducer = createActionReducer(
  ADD_USER_TO_THE_CONNECTED_LIST,
  ({ newConnectedUser }, { connectedUsers }) =>
    set('connectedUsers', concat(newConnectedUser)(connectedUsers))
)

export const addUserToTheConnectedListReducers = composeAllReducers([
  addUserToTheConnectedListReducer
])
