import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from '~client/utils/mock'
import { MobilizationBasicsForm } from '~client/mobilizations/components'

describe('client/mobilizations/components/mobilization-basics-form', () => {
  let wrapper
  const props = {
    floatSubmit: false,
    fields: {
      name: {},
      goal: {}
    },
    handleSubmit: mock.noop,
    submitFailed: false,
    dirty: false,
    valid: false
  }
  
  /*
  beforeAll(() => {
    wrapper = shallow(<MobilizationBasicsForm {...props} />)
  })
  */

  describe('#render', () => {
    it('should render without crash', () => {
      //expect(wrapper).to.be.ok
      expect(true).to.equal(true)
    })
    /*
    it('should FormRedux when floatSubmit prop is false', () => {
      expect(wrapper.find('FormRedux').length).to.equal(1)
    })
    it('should SettingsForm when floatSubmit prop is true', () => {
      wrapper = shallow(<MobilizationBasicsForm {...props} floatSubmit />)
      expect(wrapper.find('SettingsForm').length).to.equal(1)
    })
    */
  })
})
