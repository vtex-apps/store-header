import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { ExtensionPoint } from 'vtex.render-runtime'
import Collapsible from './Collapsible'
import FixedContent from './FixedContent'
import { Border, Spacer, CONSTANTS } from './Helpers'
import useDevice from './Resize';

const TopMenu = ({
  extraHeaders,
  leanMode,
  logoUrl,
  linkUrl,
  logoTitle,
  showLogin,
  showSearchBar,
}) => {

  const { desktop } = useDevice()

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
      
      <Border fixed top={CONSTANTS.COLLAPSIBLE.TOP} />

      <Collapsible top={CONSTANTS.COLLAPSIBLE.TOP} leanMode={leanMode} >
        <ExtensionPoint id="category-menu" />
      </Collapsible>

      <Spacer 
        height={ desktop 
          ? CONSTANTS.SPACER.DESKTOP
          : CONSTANTS.SPACER.MOBILE
        }
      />

    </Fragment>
  )
}

TopMenu.propTypes = {
  extraHeaders: PropTypes.node.isRequired,
  linkUrl: PropTypes.string,
  logoUrl: PropTypes.string,
  logoTitle: PropTypes.string,
  showSearchBar: PropTypes.bool,
  showLogin: PropTypes.bool,
  leanMode: PropTypes.bool,
}

TopMenu.defaultProps = {
  linkUrl: '',
  logoUrl: '',
  logoTitle: '',
  showSearchBar: true,
  showLogin: true,
  leanMode: false
}

export default TopMenu