import { take, fork } from 'redux-saga/effects'

import set from 'lodash/fp/set'
import flow from 'lodash/fp/flow'

import {
  createAsyncActions,
  createActionCreator,
  createActionReducer,
  composeAllReducers
} from '../../../Redux/Friends'

import { handleIO } from '..'

export const [CONNECT_REQUEST, CONNECT_SUCCESS] = createAsyncActions('CONNECT')

// When connecting...
export const connect = createActionCreator(
  CONNECT_REQUEST,
  ({ displayName }) => ({ displayName })
)
const connectReducer = createActionReducer(CONNECT_REQUEST, () =>
  set('isConnecting', true)
)

// Once connected
export const connectSuccess = createActionCreator(CONNECT_SUCCESS, () => ({}))
const connectSuccessReducer = createActionReducer(CONNECT_SUCCESS, () =>
  flow(set('isConnecting', false), set('isConnected', true))
)

export const connectReducers = composeAllReducers([
  connectReducer,
  connectSuccessReducer
])

export function * connectSaga () {
  while (true) {
    const { displayName } = yield take(CONNECT_REQUEST)

    yield fork(handleIO, { displayName })
  }
}
