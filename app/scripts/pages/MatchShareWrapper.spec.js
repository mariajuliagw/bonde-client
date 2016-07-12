import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { MatchShareWrapper } from './MatchShareWrapper'

describe('MatchShareWrapper', () => {
  let wrapper
  let sandbox
  let spy = {}
  let params = { id: 65, widget_id: 96 }
  let matches = {
    data: {
      first_choice: 'Foo Choice',
      second_choice: 'Bar Choice',
      goal_image: 'foo-bar-image.jpg'
    }
  }
  let props = { matches, params }
  let store = {
    getState() { return matches },
    subscribe: sinon.spy(),
    dispatch: sinon.spy()
  }
  let context = { store }

  before(() => {
    sandbox = sinon.sandbox.create()
    wrapper = shallow(<MatchShareWrapper { ...props } />)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#render', () => {
    before(() => {
      spy.metaData = sandbox.spy(MatchShareWrapper.prototype, 'metaData')
    })

    it('should render one empty <noscript> component', () => {
      expect(wrapper.html()).to.equal('<noscript></noscript>')
    })
    it('should calls metaData method', () => {
      expect(spy.metaData).to.have.been.called
    })
  })

  describe('#metaData', () => {
    describe('meta objects', () => {
      const result = MatchShareWrapper.prototype.metaData(props)

      it('should have meta prop', () => {
        expect(result).to.have.key('meta')
      })
      it('meta prop should be an object', () => {
        expect(result.meta).to.be.an.object
      })
      it('should have name prop inside meta object', () => {
        expect(result.meta).to.have.key('name')
      })
      it('name prop should be an object', () => {
        expect(result.meta.name).to.be.an.object
      })
      it('should have all required props inside name prop', () => {
        const keys = ['og:title', 'og:description', 'og:image']
        expect(result.meta.name).to.have.all.keys(keys)
      })
      it('og:title prop should be concatenation of first and second choices', () => {
        const expected = `${matches.data.first_choice} + ${matches.data.second_choice}`
        expect(result.meta.name['og:title']).to.equal(expected)
      })
      it('og:description prop should be equal as passed', () => {
        const expected = 'Subtítulo deve ser configurável.'
        expect(result.meta.name['og:description']).to.equal(expected)
      })
      it('og:image prop should be equal as passed', () => {
        expect(result.meta.name['og:image']).to.equal(matches.data.goal_image)
      })
    })
  })

  describe('#fetchData', () => {
    const result = MatchShareWrapper.fetchData(store, params)

    it('should returns resolved promises', () => {
      expect(result.constructor).to.be.a.Promise
    })
  })
})
