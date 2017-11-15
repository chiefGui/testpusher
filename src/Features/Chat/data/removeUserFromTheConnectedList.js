import set from 'lodash/fp/set'
import filter from 'lodash/fp/filter'

import {
  createActionCreator,
  createActionReducer,
  composeAllReducers
} from '../../../Redux/Friends'

const REMOVE_USER_FROM_THE_CONNECTED_LIST =
  'REMOVE_USER_FROM_THE_CONNECTED_LIST'

export const removeUserFromTheConnectedList = createActionCreator(
  REMOVE_USER_FROM_THE_CONNECTED_LIST,
  userThatLeft => ({ userThatLeft })
)

const removeUserFromTheConnectedListReducer = createActionReducer(
  REMOVE_USER_FROM_THE_CONNECTED_LIST,
  ({ userThatLeft }, { connectedUsers }) =>
    set(
      'connectedUsers',
      filter(user => user.displayName !== userThatLeft.displayName)(
        connectedUsers
      )
    )
)

export const removeUserFromTheConnectedListReducers = composeAllReducers([
  removeUserFromTheConnectedListReducer
])
