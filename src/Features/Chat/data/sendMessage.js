import set from 'lodash/fp/set'

import {
  createAsyncActions,
  createActionCreator,
  createActionReducer,
  createApiSaga,
  composeAllReducers
} from '../../../Redux/Friends'

export const [SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS] = createAsyncActions(
  'SEND_MESSAGE'
)

// When sending...
export const sendMessage = createActionCreator(
  SEND_MESSAGE_REQUEST,
  ({ user, message }) => ({ user, message })
)
const sendMessageReducer = createActionReducer(SEND_MESSAGE_REQUEST, () =>
  set('isSendingMessage', true)
)
export const sendMessageSaga = createApiSaga(
  SEND_MESSAGE_REQUEST,
  ({ user, message }) => ({
    method: 'POST',
    url: '/messages',
    data: { user, message }
  })
)

// Once sent
export const sendMessageSuccess = createActionCreator(
  SEND_MESSAGE_SUCCESS,
  ({ user, message }) => ({ user, message })
)
const sendMessageSuccessReducer = createActionReducer(
  SEND_MESSAGE_SUCCESS,
  ({ user, message }, { messages }) => set('isSendingMessage', false)
)

export const sendMessageReducers = composeAllReducers([
  sendMessageReducer,
  sendMessageSuccessReducer
])
