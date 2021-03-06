import React from 'react'
import { expect } from 'chai'
import { mountWithIntl } from '~root/intl/helpers'

import Page from '~routes/admin/authenticated/sidebar/account-edit/page'

const dummyField = field => ({
  name: field,
  onChange: () => {}
})

describe('~routes/admin/authenticated/sidebar/account-edit/page', () => {
  const props = {
    auth: {},
    submit: () => {},
    fields: {
      avatar: dummyField('avatar'),
      first_name: dummyField('first_name'),
      last_name: dummyField('last_name'),
      email: dummyField('email')
    },
    handleSubmit: () => {}
  }

  it('should render without crashed', () => {
    const page = mountWithIntl(<Page {...props} />)
    expect(page).to.be.ok
  })
})
