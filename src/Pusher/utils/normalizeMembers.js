import map from 'lodash/fp/map'

function normalizeMembers (members) {
  const listOfMembers = Object.keys(members)
  const normalizedMembers = map(
    member => ({ displayName: member }),
    listOfMembers
  )

  return normalizedMembers
}

export default normalizeMembers
