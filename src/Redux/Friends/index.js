import axios from 'axios'
import { take, call, put } from 'redux-saga/effects'

export function createAsyncActions (prefix) {
  return [`${prefix}_REQUEST`, `${prefix}_SUCCESS`, `${prefix}_FAILURE`]
}

export function createActionCreator (type, payloadFn) {
  return (...args) => ({
    type: type,
    ...payloadFn(...args)
  })
}

export function actionFromResponse (type) {
  return (response, originalPayload) => ({
    type,
    data: response.data,
    ...originalPayload
  })
}

export function createActionReducer (action, reduceFn) {
  return (state, { type, ...payload }) => {
    if (type === action) {
      const newState = reduceFn(payload, state)

      if (typeof newState === 'function') {
        return newState(state)
      }

      return newState
    }

    return state || {}
  }
}

export function createApiSaga (
  whenAction,
  factoryHttpCallSpec,
  onSuccess,
  onFailure
) {
  return function * () {
    while (true) {
      const { type, ...payload } = yield take(whenAction)

      try {
        const response = yield call(axios.request, factoryHttpCallSpec(payload))

        if (typeof onSuccess === 'function') {
          yield put(onSuccess(response, payload))
        }
      } catch (error) {
        // Here's a good spot to throw Sentry/Airbrake calls.
        console.error(error)

        if (typeof onFailure === 'function') {
          yield put(onFailure(error))
        }
      }
    }
  }
}

export function combineActionReducers (initialState, reducers) {
  return function reducer (state = initialState, action) {
    return reducers.reduce((s, reduce) => reduce(s, action), state)
  }
}

export function composeAllReducers (reducers) {
  return function composedReducer (state, action) {
    return reducers.reduce(
      (currentState, reduce) => reduce(currentState, action),
      state
    )
  }
}
