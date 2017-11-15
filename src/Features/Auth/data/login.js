import { take, put } from 'redux-saga/effects'
import set from 'lodash/fp/set'
import flow from 'lodash/fp/flow'

import {
  createAsyncActions,
  createActionCreator,
  createActionReducer,
  composeAllReducers
} from '../../../Redux/Friends'

import { connect } from '../../Chat'

// Actions
const [LOGIN_REQUEST, LOGIN_SUCCESS] = createAsyncActions('LOGIN')

// Authentication ongoing
export const login = createActionCreator(LOGIN_REQUEST, ({ displayName }) => ({
  displayName
}))

const loginReducer = createActionReducer(LOGIN_REQUEST, () =>
  set('isAuthenticating', true)
)

// Authentication succeeded
const loginSuccess = createActionCreator(LOGIN_SUCCESS, ({ displayName }) => ({
  displayName
}))

const loginSuccessReducer = createActionReducer(
  LOGIN_SUCCESS,
  ({ displayName }) =>
    flow(
      set('isAuthenticating', false),
      set('isAuthenticated', true),
      set('user', { displayName })
    )
)

export const loginReducers = composeAllReducers([
  loginReducer,
  loginSuccessReducer
])

// Custom action handling
export function * watchLogin () {
  while (true) {
    const { displayName } = yield take(LOGIN_REQUEST)

    yield put(connect({ displayName }))
    yield put(loginSuccess({ displayName }))
  }
}
