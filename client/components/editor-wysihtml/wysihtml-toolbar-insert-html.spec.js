import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { WYSIHTMLToolbarInsertHTML } from '~client/components/editor-wysihtml'

describe('client/components/editor-wysihtml/wysihtml-toolbar-insert-html', () => {
  let wrapper
  const props = {
    dispatch: () => {}
  }

  beforeAll(() => {
    wrapper = shallow(<WYSIHTMLToolbarInsertHTML {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
