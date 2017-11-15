import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import random from 'lodash/random'

import colors from '../../UI/variables/colors'

const Container = styled.aside`width: 100%;`

const Title = styled.h5`
  margin: 0;
  padding: 10px;
  color: ${colors.gray[3]};
`

const List = styled.ul`
  margin: 0;
  padding: 0;
`

const Item = styled.li`
  margin: 0;
  padding: 10px;
  list-style: none;

  &:first-child {
    padding-top: 20px;
  }

  &:not(:first-child) {
    border-top: 1px solid ${colors.gray[1]};
  }
`

const GreenDot = styled.i`
  display: inline-block;
  width: 5px;
  height: 5px;
  background-color: ${colors.green[0]};
  border-radius: 100%;
  vertical-align: middle;
`

const UserDisplayName = styled.span`
  color: ${colors.gray[3]};
  font-weight: ${props => (props.isSelf ? '600' : 'normal')};
`

const Muted = styled.span`color: ${colors.gray[1]};`

const ConnectedUserItem = ({ displayName, isSelf = false }) => (
  <Item>
    <GreenDot />{' '}
    <UserDisplayName isSelf={isSelf}>{displayName}</UserDisplayName>{' '}
    {isSelf && <Muted>(you)</Muted>}
  </Item>
)

ConnectedUserItem.propTypes = {
  displayName: PropTypes.string,
  isSelf: PropTypes.bool
}

const Sidebar = ({ selfUser, connectedUsers }) => (
  <Container>
    <Title>{connectedUsers.length} people around</Title>

    <List>
      {connectedUsers.map(user => (
        <ConnectedUserItem
          key={random(100) + user.displayName}
          displayName={user.displayName}
          isSelf={user.displayName === selfUser.displayName}
        />
      ))}
    </List>
  </Container>
)

Sidebar.propTypes = {
  selfUser: PropTypes.object.isRequired,
  connectedUsers: PropTypes.array.isRequired
}

export default Sidebar
