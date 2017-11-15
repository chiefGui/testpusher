import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'

import HomeContainer from '../Home/Container'
import ChatContainer from '../Chat/Container'
import LoginContainer from '../Login/Container'
import PrivateRoute from '../PrivateRoute/Component'

const Routes = ({ isSelfAuthenticated }) => (
  <div>
    <Route exact path='/' component={HomeContainer} />
    <Route path='/login' component={LoginContainer} />

    <PrivateRoute
      path='/chat'
      component={ChatContainer}
      isAuthenticated={isSelfAuthenticated}
    />
  </div>
)

Routes.propTypes = {
  isSelfAuthenticated: PropTypes.bool
}

export default Routes
