import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'

import colors from '../../../UI/variables/colors'

const Container = styled.div`
  padding: 10px;
  color: ${colors.gray[3]};
  font-size: 1.1em;

  &:nth-child(odd) {
    background-color: ${colors.gray[0]};
  }
`

const Name = styled.p`
  display: inline-block;
  margin: 0 10px 0 0;
  padding: 0;
  font-weight: 600;
`

const Message = ({ user, children }) => (
  <Container>
    <Flex>
      <Box>
        <Name>
          {user.displayName}
        </Name>
      </Box>

      <Box>{children}</Box>
    </Flex>
  </Container>
)

Message.propTypes = {
  user: PropTypes.object,
  children: PropTypes.any
}

export default Message
