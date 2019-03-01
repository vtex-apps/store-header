import React from 'react'
import { render } from 'test-utils.js'
import Header from '../index'

describe('Header Component', () => {
  it('should be rendered', () => {
    const component = render(<Header />)
    expect(component).toBeTruthy()
  })

  it('should match snapshot', () => {
    const component = render(<Header />)
    expect(component.asFragment()).toMatchSnapshot()
  })
})
