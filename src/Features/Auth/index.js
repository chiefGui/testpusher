import get from 'lodash/fp/get'

import { combineActionReducers } from '../../Redux/Friends'
import { login, loginReducers, watchLogin } from './data/login'

const STATE_KEY = 'auth'
const INITIAL_STATE = {
  user: null,
  isAuthenticating: false,
  isAuthenticated: false
}

export const selectUser = get(`${STATE_KEY}.user`)
export const selectIsAuthenticating = get(`${STATE_KEY}.isAuthenticating`)
export const selectIsAuthenticated = get(`${STATE_KEY}.isAuthenticated`)

export { login }

const finalReducer = combineActionReducers(INITIAL_STATE, [loginReducers])
export default function install (installReducer, installSaga) {
  installSaga(watchLogin)
  installReducer(STATE_KEY, finalReducer)
}
