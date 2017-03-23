import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { NotFound } from '~components/error'

describe('client/components/error/not-found', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<NotFound />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
