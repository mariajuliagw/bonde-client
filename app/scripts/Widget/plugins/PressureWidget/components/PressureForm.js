import React, { Component, PropTypes } from 'react'

// TODO: Reusable Input
const controlClassname = 'px3 py1 border-top'
const inputReset = {
  border: 'none',
  padding: '0',
  height: '2rem'
}


class PressureForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      name: '',
      lastName: '',
      subject: props.subject,
      body: props.body,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.subject || nextProps.body) {
      const updateState = {}
      Object.keys(nextProps).map(key => key === 'subject' || key === 'body' ? updateState[key] = nextProps[key] : null)
      this.setState(updateState)
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { onSubmit } = this.props
    onSubmit && onSubmit(this.state)
  }

  render() {
    const { buttonColor, buttonText, children } = this.props
    return (
      <form onSubmit={::this.handleSubmit}>
        <div className="ativist-form bg-white">
          <div className={controlClassname}>
            <input
              className="col-12"
              style={inputReset}
              type="email"
              placeholder="Seu e-mail"
              value={this.state.email}
              onChange={e => this.setState({email: e.target.value})} />
          </div>
          <div className={controlClassname}>
            <input
              className="col-12"
              style={inputReset}
              type="text"
              placeholder="Seu nome"
              value={this.state.name}
              onChange={e => this.setState({name: e.target.value})} />
          </div>
          <div className={controlClassname}>
            <input
              className="col-12"
              style={inputReset}
              type="text"
              placeholder="Seu sobrenome"
              value={this.state.lastName}
              onChange={e => this.setState({lastName: e.target.value})} />
          </div>
          <div className="p3 border-top">
            <button type="submit" className="caps white col-12 py2 rounded" style={{backgroundColor: buttonColor}}>{buttonText}</button>
          </div>
        </div>
        {children}
        <div className="pressure-form mt3">
          <h4 className="rounded-top m0 center py1" style={{backgroundColor: '#222'}}>
            <span className="white bold">Texto do e-mail</span>
          </h4>
          <div className="bg-white rounded-bottom">
            <div className={controlClassname}>
              <label className="flex p1 gray" htmlFor="subjectId">Assunto</label>
              <input
                className="col-12"
                style={inputReset}
                type="text"
                value={this.state.subject}
                onChange={e => this.setState({subject: e.target.value})} />
            </div>
            <div className={controlClassname}>
              <label className="flex p1 gray" htmlFor="bodyId">E-mail</label>
              <textarea
                className="col-12"
                style={{...inputReset, height: '13rem'}}
                value={this.state.body}
                onChange={e => this.setState({body: e.target.value})} />
            </div>
          </div>
        </div>
      </form>
    )
  }
}

PressureForm.propTypes = {
  onSubmit: PropTypes.func,
  buttonColor: PropTypes.string,
  buttonText: PropTypes.string,
  subject: PropTypes.string,
  body: PropTypes.string
}

PressureForm.defaultProps = {
  subject: '',
  body: ''
}


export default PressureForm