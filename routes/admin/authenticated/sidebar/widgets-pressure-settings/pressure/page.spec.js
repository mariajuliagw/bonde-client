import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from '~client/utils/mock'
import Page from '~routes/admin/authenticated/sidebar/widgets-pressure-settings/pressure/page'

describe('routes/admin/authenticated/sidebar/widgets-pressure-settings/pressure/page', () => {
  let wrapper
  const props = {
    mobilization: { color_scheme: 'meurio-scheme' },
    widget: {},
    asyncWidgetUpdate: mock.noop,
    fields: {
      show_counter: { value: true }
    },
    handleSubmit: mock.noop,
    submitting: false,
    error: undefined
  }

  beforeAll(() => {
    wrapper = shallow(<Page {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
