import { render } from 'enzyme'
// import App from '../App'
import React from 'react'

describe('App', () => {
  it('should render correctly', () => {
    const wrapper = render(<div />)
    expect(wrapper).toMatchSnapshot()
  })
})
