import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { ExtensionPoint } from 'vtex.render-runtime'
import Collapsible from './Collapsible'
import FixedContent from './FixedContent'
import { logo, collapsible } from '../defaults'

const TopMenu = ({
  extraHeaders,
  leanMode,
  logoUrl,
  linkUrl,
  logoTitle,
  logoSize,
  showLogin,
  showSearchBar,
  collapsibleAnimation,
}) => {
  return (
    <Fragment>
      {extraHeaders}

      <FixedContent
        leanMode={leanMode}
        logoUrl={logoUrl}
        linkUrl={linkUrl}
        logoSize={logoSize}
        logoTitle={logoTitle}
        showSearchBar={showSearchBar}
        showLogin={showLogin}
      />

      <Collapsible
        collapsibleAnimation={collapsibleAnimation}
        leanMode={leanMode}
      >
        <ExtensionPoint id="category-menu" />
      </Collapsible>
    </Fragment>
  )
}

TopMenu.propTypes = {
  extraHeaders: PropTypes.element,
  ...logo.propTypes,
  showSearchBar: PropTypes.bool,
  showLogin: PropTypes.bool,
  leanMode: PropTypes.bool,
  ...collapsible.propTypes,
}

TopMenu.defaultProps = {
  ...logo.defaultProps,
  showSearchBar: true,
  showLogin: true,
  leanMode: false,
  ...collapsible.defaultProps,
}

export default TopMenu
