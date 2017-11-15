import { fork, all } from 'redux-saga/effects'
import map from 'lodash/fp/map'

import { getInstalledSagas } from '../Features/installer'

function * rootSaga () {
  yield all(map(fork, getInstalledSagas()))
}

export default rootSaga
