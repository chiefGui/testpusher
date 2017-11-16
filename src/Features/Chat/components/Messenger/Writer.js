import { reduxForm } from 'redux-form'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import { selectUser as selectSelfUser } from '../../../Auth'
import { sendMessage, selectIsSendingMessage } from '../..'

import WriterForm from './WriterForm'

const mapStateToProps = state => ({
  selfUser: selectSelfUser(state),
  isSendingMessage: selectIsSendingMessage(state)
})
const mapDispatchToProps = { sendMessage }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'messenger'
  }),
  withHandlers({
    onSubmit: ({ reset, sendMessage, selfUser, handleSubmit }) =>
      handleSubmit(({ message }) => {
        sendMessage({ user: selfUser, message })
        reset()
      })
  })
)(WriterForm)
