import set from 'lodash/fp/set'
import concat from 'lodash/fp/concat'

import {
  createActionCreator,
  createActionReducer,
  composeAllReducers
} from '../../../Redux/Friends'

const ADD_MESSAGE_TO_MESSAGES_LIST = 'ADD_MESSAGE_TO_MESSAGES_LIST'

export const addMessageToMessagesList = createActionCreator(
  ADD_MESSAGE_TO_MESSAGES_LIST,
  ({ user, message }) => ({ user, message })
)

const addMessageToMessagesListReducer = createActionReducer(
  ADD_MESSAGE_TO_MESSAGES_LIST,
  ({ user, message }, { messages }) =>
    set('messages', concat(messages)({ user, message }))
)

export const addMessageToMessagesListReducers = composeAllReducers([
  addMessageToMessagesListReducer
])
