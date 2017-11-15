import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button } from '@blueprintjs/core'
import { Flex, Box } from 'grid-styled'

const Form = ({ handleSubmit, pristine, reset, submitting }) => (
  <form onSubmit={handleSubmit}>
    <Flex>
      <Box mr={10}>
        <Field
          name='displayName'
          component='input'
          type='text'
          placeholder='Your nickname'
          className='pt-input pt-large'
          autoFocus
        />
      </Box>

      <Box>
        <Button
          className='pt-intent-primary pt-large'
          type='submit'
          disabled={pristine || submitting}
        >
          Join
          <span className='pt-icon-standard pt-icon-arrow-right pt-align-right' />
        </Button>
      </Box>
    </Flex>
  </form>
)

export default reduxForm({
  form: 'login'
})(Form)
