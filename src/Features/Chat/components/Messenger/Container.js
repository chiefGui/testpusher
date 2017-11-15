import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'

import Board from './Board'
import Writer from './Writer'

const Container = styled(Flex)`height: 100%;`
const Wrapper = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
`

const Messenger = () => (
  <Container direction='column' justify='space-between'>
    <Wrapper>
      <Board />
    </Wrapper>

    <Box>
      <Writer />
    </Box>
  </Container>
)

export default Messenger
