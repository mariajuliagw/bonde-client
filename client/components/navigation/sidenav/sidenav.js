import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router'

import * as paths from '~client/paths'

if (require('exenv').canUseDOM) require('./sidenav.scss')

const Sidenav = ({ children, community }) => (
  <nav className='sidenav clearfix'>
    <div className='items items-logo'>
      <div className='item'>
        <div className='item-icon'>
          <Link to={paths.mobilizations()} style={{ height: '43px', display: 'block' }}>
            <u
              className='logo-icon nossas'
              style={{ backgroundImage: community.image ? `url(${community.image})` : undefined }}
            />
          </Link>
        </div>
        <div className='item-content'>
          <div className='table-cell align-middle'>
            <div>
              <div className='item-community-name'>
                <Link to={paths.mobilizations()}>{community.name || 'Bonde'}</Link>
              </div>
              <div className='item-community-change'>
                <Link to={paths.communityInfo()} className='col col-8'>
                  <i className='fa fa-cog mr1' />
                  <span>Configurações</span>
                </Link>
                <Link to={paths.communityList()} className='col col-4'>
                  <i className='fa fa-refresh mr1' />
                  <span>Trocar</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {children}
  </nav>
)

Sidenav.contextTypes = {
  router: PropTypes.object
}

export default Sidenav
