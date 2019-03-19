import React from 'react'
import ReactDOM from 'react-dom'
import Frame from 'components/Frame'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Frame />, div)
  ReactDOM.unmountComponentAtNode(div)
})