import React, { Fragment } from 'react'
import { bool, string, node } from 'prop-types'
import { ExtensionPoint, withRuntimeContext } from 'vtex.render-runtime'
import Collapsible from './Collapsible'
import FixedContent from './FixedContent'
import { Border, Spacer, CONSTANTS } from './Helpers'

const TopMenu = ({
  extraHeaders,
  leanMode,
  logoUrl,
  linkUrl,
  logoTitle,
  showLogin,
  showSearchBar,
  runtime: { hints: { desktop }}
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
  linkUrl: string,
  logoUrl: string,
  logoTitle: string,
  showSearchBar: bool,
  showLogin: bool,
  leanMode: bool,
  extraHeaders: node,
  desktop: bool
}

TopMenu.defaultProps = {
  showSearchBar: true,
  showLogin: true,
}

export default withRuntimeContext(TopMenu)