import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import styled from 'styled-components'
import map from 'lodash/fp/map'

import { selectMessages } from '../..'

import Message from './Message'

import colors from '../../../UI/variables/colors'

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const MutedWarning = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1.4em;
  color: ${colors.gray[2]};
`

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
`

const Board = ({ messages }) => {
  const hasMessages = messages.length > 0

  return (
    <Container>
      {!hasMessages && (
        <Center>
          <MutedWarning>This chat has no messages at this moment.</MutedWarning>
        </Center>
      )}

      {hasMessages && (
        <Messages>
          {map(
            ({ user, message }, index) => (
              <Message key={index + message} user={user}>
                {message}
              </Message>
            ),
            messages
          )}
        </Messages>
      )}
    </Container>
  )
}

const mapStateToProps = state => ({
  messages: selectMessages(state)
})

Board.propTypes = {
  messages: PropTypes.array
}

export default compose(connect(mapStateToProps))(Board)
