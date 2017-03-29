import { provideHooks } from 'redial'
import { connect } from 'react-redux'

import * as SelectableActions from '~components/selectable-list/actions'
import MobSelectors from '~client/mobrender/redux/selectors'
import * as MobActions from '~client/mobrender/redux/action-creators'
import * as TemplateActions from '~mobilizations/templates/action-creators'
import * as TemplateSelectors from '~mobilizations/templates/selectors'

import Page from './page'

const redial = {
  fetch: ({ dispatch, getState, params }) => {
    const state = getState()
    const promises = []

    !MobSelectors(state).hasCurrentMobilization() && promises.push(
      dispatch(MobActions.selectMobilization(params.mobilization_id))
    )
    !TemplateSelectors.isLoaded(state) && promises.push(
      dispatch(TemplateActions.asyncFetch())
    )
    return Promise.all(promises)
  }
}

const mapStateToProps = (state) => ({
  mobilization: MobSelectors(state).getMobilization(),
  templates: TemplateSelectors.getGlobalTemplates(state),
  filterableTemplates: TemplateSelectors.getFilterableTemplates(state),
  selectedIndex: TemplateSelectors.getSelectableIndex(state)
})

const mapActionCreatorsToProps = {
  setSelectedIndex: SelectableActions.setSelectedIndex,
  createMobilizationFromTemplate: MobActions.asyncUpdateMobilization
}

export default provideHooks(redial)(
  connect(mapStateToProps, mapActionCreatorsToProps)(Page)
)