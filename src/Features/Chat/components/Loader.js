import React from 'react'
import styled from 'styled-components'

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`

const Loader = () => (
  <Center>
    <div className='pt-spinner'>
      <div className='pt-spinner-svg-container'>
        <svg viewBox='0 0 100 100'>
          <path
            className='pt-spinner-track'
            d='M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89'
          />
          <path
            className='pt-spinner-head'
            d='M 94.5 50 A 44.5 44.5 0 0 0 50 5.5'
          />
        </svg>
      </div>
    </div>
  </Center>
)

export default Loader
