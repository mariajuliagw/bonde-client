import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { intlShape } from 'react-intl'
import { FormRedux, ControlLabel, FormControl, FormGroup } from '~client/components/forms'
import { Button } from '~client/ux/components'
import * as dnsMessages from '~client/community/notifications/dns'
import { Steps, Step } from '~client/steps'
import { DomainStep } from '~client/community/components/dns'

class Page extends Component {

  constructor (props) {
    super(props)
    this.state = {
      dns: undefined,
      renderTestConnection: false
    }
  }

  handleTestConnection () {
    const { checkHostedZone, notify, intl } = this.props
    checkHostedZone(this.state.dns)
      .then(dns => {
        this.setState({ dns })

        const handleNotify = event => {
          const { id, message: defaultMessage, ...n } = event()
          notify({
            ...n,
            message: intl.formatMessage({ id, defaultMessage })
          })
        }

        if (!dns.ns_ok) handleNotify(dnsMessages.checkDNSFailure)
        else handleNotify(dnsMessages.checkDNSSuccess)
      })
  }

  render () {
    const { saving, save, fields: { domain_name: domainName }, ...formProps } = this.props

    return (
      <div className='page'>
        <Steps
          renderRule={(position, current) => position <= current}
          progressValidations={[
            () => this.state.dns !== undefined,
            () => this.state.renderTestConnection,
            () => this.state.dns && this.state.dns.ns_ok
          ]}
        >
          <Step title='Insira o domínio desejado' stepComponent={DomainStep}>
            <FormRedux
              nosubmit
              {...formProps}
              onSubmit={values => {
                return save(values)
                  .then(dns => {
                    this.setState({ dns })
                    return Promise.resolve()
                  })
              }}
            >
              <FormGroup {...domainName}>
                <ControlLabel>Domínio da sua comunidade</ControlLabel>
                <FormControl type='text' placeholder='Ex. minhacomunidade.org' />
              </FormGroup>
              <Button disabled={saving} type='submit'>Adicionar</Button>
            </FormRedux>
          </Step>
          <Step title='Altere os servidores do seu provedor DNS' stepComponent={DomainStep}>
            <p>1. Faça login no seu provedor de DNS (onde seu domínio está registrado, por exemplo GoDaddy, Locaweb, RegistroBR)</p>
            <p>2. Encontre a página de <b>gerenciador de DNS</b>, e altere os <b>nomes de servidor</b> para os servidores do Bonde:</p>
            <br />
            {this.state.dns && this.state.dns.delegation_set_servers.map((server, index) => <p key={`server-${index}`}>{server}</p>)}
            <Button
              onClick={() => {
                const { location: { query } } = this.props
                if (query && query.next) {
                  browserHistory.push(query.next)
                } else {
                  this.setState({ renderTestConnection: true })
                }
              }}
            >
              Continuar
            </Button>
          </Step>
          <Step title='Teste a conexão' stepComponent={DomainStep}>
            <div>
              <p>Clique no botão abaixo para verificar se tudo está certo.</p>
              <p>Atenção: a mudança de DNS pode demorar até 48 horas para ser propagada pela internet.</p>
            </div>
            <Button onClick={() => this.handleTestConnection()}>Testar</Button>
          </Step>
        </Steps>
      </div>
    )
  }
}

Page.propTypes = {
  intl: intlShape.isRequired
}

export default Page
