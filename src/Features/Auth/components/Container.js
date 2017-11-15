import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import styled from 'styled-components'

import Form from './Form'
import { login, selectIsAuthenticated } from '..'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`

const Greetings = styled.h3`
  margin: 0 0 20px;
  padding: 0;
`

const Container = ({ isSelfAuthenticated, login }) => {
  if (isSelfAuthenticated) {
    return <Redirect to='/chat' />
  }

  return (
    <Wrapper>
      <Greetings>Greetings, writer</Greetings>

      <Form onSubmit={login} />
    </Wrapper>
  )
}

const mapStateToProps = state => ({
  isSelfAuthenticated: selectIsAuthenticated(state)
})
const mapDispatchToProps = { login }

Container.propTypes = {
  isSelfAuthenticated: PropTypes.bool,
  login: PropTypes.func
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(Container)
