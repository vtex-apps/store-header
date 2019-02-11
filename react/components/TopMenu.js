import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { ExtensionPoint } from 'vtex.render-runtime'
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
      
      <FixedContent 
        leanMode={leanMode}
        logoUrl={logoUrl}
        linkUrl={linkUrl}
        logoTitle={logoTitle}
        showSearchBar={showSearchBar}
        showLogin={showLogin}
      />
      
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
  extraHeaders: PropTypes.node,
}

TopMenu.defaultProps = {
  showSearchBar: true,
  showLogin: true,
}

export default TopMenu