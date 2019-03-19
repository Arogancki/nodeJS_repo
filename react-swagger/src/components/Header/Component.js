import React from 'react'
import styled from 'styled-components'
import { PropTypes } from 'prop-types'

const H1 = styled.h1`
  margin: 0;
  padding: 0.8rem 1.5rem;
`

function Header(props) {
  return (
    <H1>
      {props.title}
    </H1>
  )
}

Header.propTypes = {
  title: PropTypes.string
}

Header.defaultProps = {
  title: 'Header'
}

export default Header