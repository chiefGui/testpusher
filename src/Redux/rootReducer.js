import { combineReducers } from 'redux'
import { getInstalledReducers } from '../Features/installer'
import { reducer as formReducer } from 'redux-form'

const installedReducers = getInstalledReducers()
const reducers = {
  form: formReducer
}

function mergeReducers (reducers) {
  return (state, action) => {
    // NOTE: if we're merging two reducers, we need to produce the initial state for both and
    // merge, otherwise, we would get only the last reducer initial state. So the main reason of
    // `state === undefied` checking here is to assert we're initializing the store state or maybe
    // resetting it, which makes sense to combine everything that both reducers have produced
    // initially
    if (state === undefined) {
      const initialStates = reducers.map(reducer => reducer(state, action))
      return Object.assign({}, ...initialStates)
    }

    return reducers.reduce(
      (previousState, reduce) => reduce(previousState, action),
      state
    )
  }
}

Object.keys(installedReducers).forEach(key => {
  const installedReducerOrReducers = installedReducers[key]

  if (reducers[key]) {
    const legacyReducer = reducers[key]

    // NOTE: if at some point we allow `installReducer` to happen twice with the same state key on
    // different features/domains, we would be covered. All we have to do is to combine all the
    // initial state they render and merge everything
    if (Array.isArray(installedReducerOrReducers)) {
      reducers[key] = mergeReducers([
        legacyReducer,
        ...installedReducerOrReducers
      ])
      return
    }

    reducers[key] = mergeReducers([legacyReducer, installedReducerOrReducers])
    return
  }

  reducers[key] = mergeReducers(installedReducerOrReducers)
})

export default combineReducers(reducers)
