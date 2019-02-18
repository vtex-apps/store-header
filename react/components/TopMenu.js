import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { ExtensionPoint } from 'vtex.render-runtime'
import Collapsible from './Collapsible'
import FixedContent from './FixedContent'
import { logo, collapsible, icons, lean, searchBar, login } from '../defaults'

/**
 * Top menu that contains the fixed and collapsible parts
 * @param {Object} extraHeaders - very top aditional sections
 * @param {Boolean} leanMode - if it's leanMode
 * @param {String} logoUrl - url of the logo src
 * @param {String} linkUrl - url that logo should redirect
 * @param {String} logoTitle - alt of the logo
 * @param {Object} logoSize - sizes of logo on mobile and desktop
 * @param {Boolean} showSearchBar - if should show searchbar
 * @param {Boolean} showLogin - if should show login
 * @param {String} iconClasses - classes for icons
 * @param {String} labelClasses - classes for labels
 * @param {Object} collapsibleAnimation - collapsible animation controlling
 */
const TopMenu = ({
  extraHeaders,
  leanMode,
  logoUrl,
  linkUrl,
  logoTitle,
  logoSize,
  showLogin,
  showSearchBar,
  iconClasses,
  labelClasses,
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
        iconClasses={iconClasses}
        labelClasses={labelClasses}
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
  /** Very top aditional sections */
  extraHeaders: PropTypes.element,
  ...lean.propTypes,
  ...login.propTypes,
  ...searchBar.propTypes,
  ...logo.propTypes,
  ...icons.propTypes,
  ...collapsible.propTypes,
}

TopMenu.defaultProps = {
  ...lean.defaultProps,
  ...login.defaultProps,
  ...searchBar.defaultProps,
  ...logo.defaultProps,
  ...icons.defaultProps,
  ...collapsible.defaultProps,
}

export default TopMenu
