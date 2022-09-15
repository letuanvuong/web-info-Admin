import { mount } from 'enzyme'

import I18nButton from './I18nButton'

it('render', () => {
  const wrapper = mount(
      <I18nButton />
    )
    expect(wrapper.render()).toMatchSnapshot()
})
