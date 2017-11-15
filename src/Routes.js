import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'

import HomeContainer from './Features/Home/components/Container'
import ChatContainer from './Features/Chat/components/Container'
import LoginContainer from './Features/Auth/components/Container'
import PrivateRoute from './Features/PrivateRoute/component'

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
