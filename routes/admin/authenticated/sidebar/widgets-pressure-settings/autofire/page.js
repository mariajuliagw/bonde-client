import React, { PropTypes } from 'react'

import { Loading } from '~client/components/await'
import { FormAutofire } from '~client/mobilizations/widgets/components'

const PressureSettingsAutofirePage = props => !props.widget ? <Loading /> : <FormAutofire {...props} />

PressureSettingsAutofirePage.propTypes = {
  // Injected by redux-form
  fields: PropTypes.object.isRequired,
  // Injected by container
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  asyncWidgetUpdate: PropTypes.func.isRequired
}

export default PressureSettingsAutofirePage
