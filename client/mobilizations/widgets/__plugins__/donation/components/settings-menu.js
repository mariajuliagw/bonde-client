import PropTypes from 'prop-types'
import React from 'react'

// Global module dependencies
import * as paths from '~client/paths'
import { Tabs, Tab } from '~client/components/navigation/tabs'
import { SettingsPageMenuLayout } from '~client/components/layout'

const SettingsMenu = ({ mobilization, widget, location }) => {
  const donationPath = paths.donation(mobilization.id, widget.id)
  const donationAutofirePath = paths.donationAutofire(mobilization.id, widget.id)
  const donationFinishPath = paths.donationFinish(mobilization.id, widget.id)

  return (
    <SettingsPageMenuLayout title='Configure o bloco de doação'>
      <Tabs>
        <Tab
          text='Ajustes'
          path={donationPath}
          isActive={donationPath === location.pathname}
        />
        <Tab
          text='Mensagem agradecimento'
          path={donationAutofirePath}
          isActive={donationAutofirePath === location.pathname}
        />
        <Tab
          text='Pós-doação'
          path={donationFinishPath}
          isActive={donationFinishPath === location.pathname}
        />
      </Tabs>
    </SettingsPageMenuLayout>
  )
}

SettingsMenu.propTypes = {
  mobilization: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  widget: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired
}

export default SettingsMenu
