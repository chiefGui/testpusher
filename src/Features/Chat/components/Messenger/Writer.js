import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import { selectUser as selectSelfUser } from '../../../Auth'
import { sendMessage, selectIsSendingMessage } from '../..'

import Form from './WriterForm'

const Writer = ({ selfUser, sendMessage, isSendingMessage }) => (
  <Form
    onSubmit={({ message }) => sendMessage({ user: selfUser, message })}
    isSendingMessage={isSendingMessage}
  />
)

Writer.propTypes = {
  selfUser: PropTypes.object,
  sendMessage: PropTypes.func,
  isSendingMessage: PropTypes.bool
}

const mapStateToProps = state => ({
  selfUser: selectSelfUser(state),
  isSendingMessage: selectIsSendingMessage(state)
})
const mapDispatchToProps = { sendMessage }

export default compose(connect(mapStateToProps, mapDispatchToProps))(Writer)
