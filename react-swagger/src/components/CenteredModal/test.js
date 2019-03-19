import React from 'react'
import { render } from 'react-testing-library'
import CenteredModal from 'components/CenteredModal'

it('Modal content renders its content', () => {
  const content = 'hello world'
  const { getByText } = render(<CenteredModal content={content} isOpen={true}/>)
  expect(getByText(content)).toBeInstanceOf(HTMLElement)
})