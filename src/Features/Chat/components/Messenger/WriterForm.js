import React from 'react'
import { Field } from 'redux-form'
import styled from 'styled-components'

import colors from '../../../UI/variables/colors'

const Container = styled.div`width: 100%;`

const MessageField = styled(Field)`
  padding: 20px;
  width: 100%;
  border: none;
  border-top: 1px solid ${colors.gray[0]};
  outline: none;
  font-size: 1.2em;
`

const Form = ({ onSubmit, reset, submitting, isSendingMessage }) => (
  <form onSubmit={onSubmit}>
    <Container>
      <MessageField
        name='message'
        component='input'
        type='text'
        placeholder={isSendingMessage ? 'Sending...' : 'Type your message'}
        autoComplete='off'
        autoFocus
      />
    </Container>
  </form>
)

export default Form
