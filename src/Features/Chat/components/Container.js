import React from 'react'
import PropTypes from 'prop-types'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { Flex, Box } from 'grid-styled'
import styled from 'styled-components'

import { selectUser as selectSelfUser } from '../../Auth'
import {
  selectIsConnecting,
  selectIsConnected,
  selectConnectedUsers
} from '../../Chat'

import Loader from './Loader'
import Sidebar from './Sidebar'
import Messenger from './Messenger/Container'

import colors from '../../UI/variables/colors'

const MessengerContainer = styled(Box)`
  width: 100%;
  height: 100vh;
`

const SidebarContainer = styled(Box)`
  width: 300px;
  height: 100vh;
  background-color: #fff;
  border-left: 1px solid ${colors.gray[0]};
`

const Chat = ({ selfUser, isConnecting, isConnected, connectedUsers }) => {
  if (isConnecting) {
    return <Loader />
  }

  return (
    <Flex justify='space-between'>
      <MessengerContainer justify='space-between'>
        <Messenger />
      </MessengerContainer>

      <SidebarContainer>
        <Sidebar selfUser={selfUser} connectedUsers={connectedUsers} />
      </SidebarContainer>
    </Flex>
  )
}

const mapStateToProps = state => ({
  selfUser: selectSelfUser(state),
  isConnecting: selectIsConnecting(state),
  isConnected: selectIsConnected(state),
  connectedUsers: selectConnectedUsers(state)
})

Chat.propTypes = {
  selfUser: PropTypes.object,
  isConnecting: PropTypes.bool,
  isConnected: PropTypes.bool,
  connectedUsers: PropTypes.array
}

export default compose(
  connect(mapStateToProps),
  lifecycle({
    componentDidMount () {}
  })
)(Chat)
