import { connect } from 'react-redux'

import Form from './__form__'
import * as MobActions from '~client/mobrender/redux/action-creators'

const mapDispatchToProps = {
  asyncFormEntryCreate: MobActions.asyncFormEntryCreate
}

export { default as Form } from './__form__'
export default connect(undefined, mapDispatchToProps)(Form)
