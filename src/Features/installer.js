import { uniq } from 'lodash/fp'
import features from '.'

const installedSagas = []
const mapOfReducers = {}

function installSaga (saga) {
  if (typeof saga !== 'function') {
    throw new Error(`${saga} is not a function`)
  }

  installedSagas.push(saga)
}

function installReducer (atPath, reducer) {
  if (!mapOfReducers[atPath]) {
    mapOfReducers[atPath] = [reducer]
    return
  }

  mapOfReducers[atPath].push(reducer)
}

export function getInstalledReducers () {
  return mapOfReducers
}

export function getInstalledSagas () {
  return uniq(installedSagas)
}

function installFeature (featureInstaller) {
  if (featureInstaller) {
    featureInstaller(installReducer, installSaga)
  }
}

features.forEach(feature => installFeature(feature))
