import React from 'react'
import ReactDOM from 'react-dom'
import Row from 'components/Row'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Row />, div)
  ReactDOM.unmountComponentAtNode(div)
})