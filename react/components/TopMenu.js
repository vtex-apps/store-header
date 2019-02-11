import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { ExtensionPoint } from 'vtex.render-runtime'
import { Container } from 'vtex.store-components'
import header from '../store-header.css'
import Collapsible from './Collapsible'
import FixedContent from './FixedContent'
import { Border, Spacer } from './Helpers'

const TopMenu = ({
  extraHeaders,
  leanMode,
  logoUrl,
  linkUrl,
  logoTitle,
  showLogin,
  showSearchBar,
}) => {

  return(
    <Fragment>
      
      <div 
        className="fixed top-0 left-0 w-100 z-4 h2"
        style={{ 
          transform: 'translateZ(0)' //Avoid shaking
        }}
      >
        {extraHeaders}
      </div>

      <Container
        className={`${header.topMenuContainer} flex justify-center w-100 bg-base left-0 z-3 fixed h3 top-2`}
        style={{
          transform: 'translateZ(0)' //Avoid shaking
        }}
      >
        <div
          className={`w-100 mw9 flex justify-center ${ leanMode ? 'pv0' : 'pv6-l pv2-m'}`}
          style={{
            /** Prevents the empty margins of this element from blocking the users clicks
              * TODO: create a tachyons class for pointer events and remove this style
              * @author lbebber */
            pointerEvents: 'none',
          }}
        >
          <div
            className="flex w-100 justify-between-m items-center pv3"
            style={{
              pointerEvents: 'auto',
            }}>
              <FixedContent 
                mobileSearchActive={false}
                leanMode={leanMode}
                logoUrl={logoUrl}
                linkUrl={linkUrl}
                logoTitle={logoTitle}
                showSearchBar={showSearchBar}
                showLogin={showLogin}
              />
          </div>
        </div>
      </Container>
      
      <Border fixed top={96} />

      <Collapsible top={96} leanMode={leanMode} >
        <ExtensionPoint id="category-menu" />
      </Collapsible>

      <Spacer height={ 96 + 64 } />

    </Fragment>
  )
}

TopMenu.propTypes = {
  linkUrl: PropTypes.string,
  logoUrl: PropTypes.string,
  logoTitle: PropTypes.string,
  showSearchBar: PropTypes.bool,
  showLogin: PropTypes.bool,
  leanMode: PropTypes.bool,
  onUpdateDimensions: PropTypes.func,
  extraHeaders: PropTypes.node,
  mobile: PropTypes.bool
}

TopMenu.defaultProps = {
  showSearchBar: true,
  showLogin: true,
  onUpdateDimensions: () => { },
}

export default TopMenu