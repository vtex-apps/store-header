import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { ExtensionPoint } from 'vtex.render-runtime'
import Collapsible from './Collapsible'
import FixedContent from './FixedContent'
import { logo, collapsible, icons, lean, searchBar } from '../defaults'

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
  ...lean.propTypes,
  ...searchBar.propTypes,
  ...logo.propTypes,
  ...icons.propTypes,
  ...collapsible.propTypes,
}

TopMenu.defaultProps = {
  ...lean.defaultProps,
  ...searchBar.defaultProps,
  ...logo.defaultProps,
  ...icons.defaultProps,
  ...collapsible.defaultProps,
}

export default TopMenu
