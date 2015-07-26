import React from 'react/addons'
import * as BlockActions from './../../actions/BlockActions'
import { Block, Widget, ColorPicker, DropDownMenu, DropDownMenuItem } from './../../components'

let { TestUtils } = React.addons

let sandbox, widget1, widget2, allWidgets, blockWidgets, block

beforeEach(() => {
  sandbox = sinon.sandbox.create()
})

afterEach(() => {
  sandbox.restore()
})

describe('Block', () => {
  before(() => {
    widget1 = { block_id: 1, id: 1, settings: { content: "My widget1" } }
    widget2 = { block_id: 2, id: 2, settings: { content: "My widget2" } }
    allWidgets = [widget1, widget2]
    blockWidgets = [widget1]
    block = { id: 1 }
  })

  describe('#filterWidgets', () => {
    it('should return widgets filtered by block_id', () => {
      const filteredWidgets = Block.prototype.filterWidgets(allWidgets, block)
      expect(filteredWidgets).to.include(widget1)
      expect(filteredWidgets).to.not.include(widget2)
    })
  })

  describe('#renderWidgets', () => {
    it('should return widgets components', () => {
      const renderedWidgets = Block.prototype.renderWidgets(allWidgets)
      expect(renderedWidgets).to.have.length(allWidgets.length)
      assert(TestUtils.isElementOfType(renderedWidgets[0], Widget))
      assert(TestUtils.isElementOfType(renderedWidgets[1], Widget))
    })
  })

  describe('#handleKeyUp', () => {
    it('should set editing background to false when pressed ESC key', () => {
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} />
      )
      component.setState({editingBackground: true})
      component.handleKeyUp({keyCode: 27})
      expect(component.state.editingBackground).to.be.false
    })

    it('should not set editing background to false when pressed ESC key', () => {
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} />
      )
      component.setState({editingBackground: true})
      component.handleKeyUp({keyCode: 13})
      expect(component.state.editingBackground).to.be.true
    })
  })

  describe('#handleCancelEdit', () => {
    it('should set editing background to false', () => {
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} />
      )
      component.setState({editingBackground: true})
      component.handleCancelEdit()
      expect(component.state.editingBackground).to.be.false
    })
  })

  describe('#handleColorClick', () => {
    it('should dispatch edit block action', () => {
      const editBlockStub = sandbox.stub(BlockActions, 'editBlock')
      const component = TestUtils.renderIntoDocument(
        <Block dispatch={() => {}} mobilization={{id: 1}} widgets={allWidgets} block={block} />
      )
      component.setState({
        editingBackground: true,
        bgClass: 'bg-test'
      })
      const event = {currentTarget: {getAttribute() { return 'bg-1' }}}
      component.handleColorClick(event)
      expect(component.state.editingBackground).to.be.false
      expect(editBlockStub).to.have.been.calledWith({
        mobilization_id: component.props.mobilization.id,
        block_id: component.props.block.id,
        block: {
          bg_class: 'bg-1'
        }
      })
    })
  })

  describe('#handleEditBackgroundClick', () => {
    it('should set editing background to true', () => {
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} />
      )
      component.setState({editingBackground: false})
      component.handleEditBackgroundClick()
      expect(component.state.editingBackground).to.be.true
    })
  })

  describe('#handleMoveUpClick', () => {
    it('should dispatch move block up action', () => {
      const moveBlockUpStub = sandbox.stub(BlockActions, 'moveBlockUp')
      const component = TestUtils.renderIntoDocument(
        <Block dispatch={() => {}} mobilization={{id: 1}} widgets={allWidgets} block={block} />
      )
      component.handleMoveUpClick()
      expect(moveBlockUpStub).to.have.been.calledWith({
        mobilization_id: component.props.mobilization.id,
        block: component.props.block,
        blocks: component.props.blocks
      })
    })
  })

  describe('#handleMoveDownClick', () => {
    it('should dispatch move block down action', () => {
      const moveBlockDownStub = sandbox.stub(BlockActions, 'moveBlockDown')
      const component = TestUtils.renderIntoDocument(
        <Block dispatch={() => {}} mobilization={{id: 1}} widgets={allWidgets} block={block} />
      )
      component.handleMoveDownClick()
      expect(moveBlockDownStub).to.have.been.calledWith({
        mobilization_id: component.props.mobilization.id,
        block: component.props.block,
        blocks: component.props.blocks
      })
    })
  })

  describe('#handleToggleHiddenClick', () => {
    it('should dispatch edit block action when visible', () => {
      const editBlockStub = sandbox.stub(BlockActions, 'editBlock')
      const component = TestUtils.renderIntoDocument(
        <Block dispatch={() => {}} mobilization={{id: 1}} widgets={allWidgets} block={{...block, hidden: false}} />
      )
      component.handleToggleHiddenClick()
      expect(editBlockStub).to.have.been.calledWith({
        mobilization_id: component.props.mobilization.id,
        block_id: component.props.block.id,
        block: { hidden: true}
      })
    })

    it('should dispatch edit block action when hidden', () => {
      const editBlockStub = sandbox.stub(BlockActions, 'editBlock')
      const component = TestUtils.renderIntoDocument(
        <Block dispatch={() => {}} mobilization={{id: 1}} widgets={allWidgets} block={{...block, hidden: true}} />
      )
      component.handleToggleHiddenClick()
      expect(editBlockStub).to.have.been.calledWith({
        mobilization_id: component.props.mobilization.id,
        block_id: component.props.block.id,
        block: { hidden: false}
      })
    })
  })

  describe('#handleRemoveClick', () => {
    it('should dispatch remove block action when confirmed', () => {
      sandbox.stub(window, 'confirm').returns(true)
      const removeBlockStub = sandbox.stub(BlockActions, 'removeBlock')
      const component = TestUtils.renderIntoDocument(
        <Block dispatch={() => {}} mobilization={{id: 1}} widgets={allWidgets} block={block} />
      )
      component.handleRemoveClick()
      expect(removeBlockStub).to.have.been.calledWith({
        mobilization_id: component.props.mobilization.id,
        block_id: component.props.block.id
      })
    })

    it('should not dispatch remove block action when not confirmed', () => {
      sandbox.stub(window, 'confirm').returns(false)
      const removeBlockStub = sandbox.stub(BlockActions, 'removeBlock')
      const component = TestUtils.renderIntoDocument(
        <Block dispatch={() => {}} mobilization={{id: 1}} widgets={allWidgets} block={block} />
      )
      component.handleRemoveClick()
      expect(removeBlockStub).to.not.have.been.called
    })
  })

  describe('#handleMouseOver', () => {
    it('should set has mouse over to true', () => {
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} />
      )
      component.setState({hasMouseOver: false})
      component.handleMouseOver()
      expect(component.state.hasMouseOver).to.be.true
    })
  })

  describe('#handleMouseOut', () => {
    it('should set has mouse over to false', () => {
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} />
      )
      component.setState({hasMouseOver: true})
      component.handleMouseOut()
      expect(component.state.hasMouseOver).to.be.false
    })
  })

  describe('#render', () => {
    it('should render container and bind events', () => {
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} />
      )
      const container = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')[0]
      expect(container.props.onKeyUp.toString()).to.equal(component.handleKeyUp.bind(component).toString())
      expect(container.props.onMouseOver.toString()).to.equal(component.handleMouseOver.bind(component).toString())
      expect(container.props.onMouseOut.toString()).to.equal(component.handleMouseOut.bind(component).toString())
    })

    it('should render filtered widgets components', () => {
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} blocks={[{}]} />
      )
      const widgetsComponents = TestUtils.scryRenderedComponentsWithType(component, Widget)
      expect(widgetsComponents).to.have.length(blockWidgets.length)
    })

    it('should render DropDownMenu with display-none when mouse is out', () => {
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} />
      )
      component.setState({hasMouseOver: false})
      const menus = TestUtils.scryRenderedComponentsWithType(component, DropDownMenu)
      expect(menus).to.have.length(1)
      expect(menus[0].props.className).to.equal('display-none')
    })

    it('should render DropDownMenu with display-none when mouse is out', () => {
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} />
      )
      component.setState({hasMouseOver: true})
      const menu = TestUtils.scryRenderedComponentsWithType(component, DropDownMenu)
      expect(menu).to.have.length(1)
      expect(menu[0].props.className).to.be.empty
    })

    it('should render DropDownMenuItems', () => {
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} />
      )
      const items = TestUtils.scryRenderedComponentsWithType(component, DropDownMenuItem)
      expect(items).to.have.length(5)
      expect(items[0].props.onClick.toString()).to.equal(component.handleEditBackgroundClick.bind(component).toString())
      expect(items[1].props.onClick.toString()).to.equal(component.handleToggleHiddenClick.bind(component).toString())
      expect(items[2].props.onClick.toString()).to.equal(component.handleRemoveClick.bind(component).toString())
      expect(items[3].props.onClick.toString()).to.equal(component.handleMoveUpClick.bind(component).toString())
      expect(items[4].props.onClick.toString()).to.equal(component.handleMoveDownClick.bind(component).toString())
    })

    it('should disable move up menu item when canMoveUp is false', () => {
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} canMoveUp={false} />
      )
      const items = TestUtils.scryRenderedComponentsWithType(component, DropDownMenuItem)
      expect(items[3].props.disabled).to.be.true
    })

    it('should not disable move up menu item when canMoveUp is true', () => {
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} canMoveUp={true} />
      )
      const items = TestUtils.scryRenderedComponentsWithType(component, DropDownMenuItem)
      expect(items[3].props.disabled).to.be.false
    })

    it('should disable move down menu item when canMoveDown is false', () => {
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} canMoveDown={false} />
      )
      const items = TestUtils.scryRenderedComponentsWithType(component, DropDownMenuItem)
      expect(items[4].props.disabled).to.be.true
    })

    it('should not disable move down menu item when canMoveDown is true', () => {
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} canMoveDown={true} />
      )
      const items = TestUtils.scryRenderedComponentsWithType(component, DropDownMenuItem)
      expect(items[4].props.disabled).to.be.false
    })

    it('should render color picker when editing background', () => {
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} />
      )
      component.setState({editingBackground: true})
      const colorPicker = TestUtils.scryRenderedComponentsWithType(component, ColorPicker)
      expect(colorPicker).to.have.length(1)
    })

    it('should not render color picker when editing background', () => {
      const component = TestUtils.renderIntoDocument(
        <Block widgets={allWidgets} block={block} />
      )
      component.setState({editingBackground: false})
      const colorPicker = TestUtils.scryRenderedComponentsWithType(component, ColorPicker)
      expect(colorPicker).to.have.length(0)
    })
  })
})