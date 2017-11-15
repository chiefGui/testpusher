import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import '@blueprintjs/core/dist/blueprint.css'

import { selectIsAuthenticated as selectIsSelfAuthenticated } from './Features/Auth'

import Routes from './Routes'
import './base.css'

const App = ({ isSelfAuthenticated }) => (
  <Router>
    <Routes isSelfAuthenticated={isSelfAuthenticated} />
  </Router>
)

const mapStateToProps = state => ({
  isSelfAuthenticated: selectIsSelfAuthenticated(state)
})

App.propTypes = {
  isSelfAuthenticated: PropTypes.bool
}

export default compose(connect(mapStateToProps))(App)
