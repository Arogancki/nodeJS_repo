import React from 'react'
import { render } from 'react-testing-library'
import Header from 'components/Header'

it('Modal content renders its content', () => {
  const title = 'hello world'
  const { getByText } = render(<Header title={title}/>)
  expect(getByText(title)).toBeInstanceOf(HTMLElement)
})