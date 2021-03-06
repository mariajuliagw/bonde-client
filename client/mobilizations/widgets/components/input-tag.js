import PropTypes from 'prop-types'
import React, { Component } from 'react'

// Current module dependencies
import { BlockTag } from '../components'

class InputTag extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: undefined,
      value: ''
    }
  }

  handleKeyPress (event) {
    // [Enter] should not submit the form when choosing an address.
    if (event.charCode === 13) {
      event.preventDefault()
      const { onInsertTag, validate } = this.props
      const value = event.target.value
      const errors = validate && validate(value)

      if (errors && !errors.valid) {
        this.setState({ error: errors.message })
      } else {
        onInsertTag && onInsertTag(value)
        this.setState({ value: '', error: undefined })
      }
    }
  }

  handleEdit (value) {
    const { onRemoveTag } = this.props
    onRemoveTag && onRemoveTag(value)
    this.setState({ value: value, error: undefined })
  }

  render () {
    const { values, label, onRemoveTag } = this.props

    return (
      <div className='input-tag'>
        {label && (
          <label
            style={{ cursor: 'pointer' }}
            className='h5 bold caps'
            htmlFor='insert-tag-id'
          >
            {label}
            {(this.state.error && <span className='red'> - {this.state.error}</span>)}
          </label>
        )}
        <p className='h5'>{'1. Informe nome e email. Ex.: Nome <email@provedor.com>'}</p>
        <p className='h5'>{'2. Pressione <Enter> para adicionar mais alvos.'}</p>
        <input
          ref='insert'
          id='insert-tag-id'
          type='text'
          className='input block h3 col-12 mt1 px1'
          value={this.state.value}
          onChange={(e) => this.setState({ value: e.target.value })}
          onKeyPress={::this.handleKeyPress}
        />
        <BlockTag
          tags={values}
          onClick={::this.handleEdit}
          onRemove={onRemoveTag}
        />
      </div>
    )
  }
}

InputTag.propTypes = {
  label: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  validate: PropTypes.func,
  onInsertTag: PropTypes.func.isRequired,
  onRemoveTag: PropTypes.func.isRequired
}

export default InputTag
