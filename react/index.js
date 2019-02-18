import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { ExtensionPoint, useRuntime } from 'vtex.render-runtime'
import TopMenu from './components/TopMenu'
import { Spacer } from './components/Helpers'
import { logo, collapsible, icons, searchBar, login } from './defaults'

import styles from './store-header.css'

/**
 * Main header component
 * @param {String} leanWhen - cases in which the menu is in lean mode
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
const Header = ({
  leanWhen,
  linkUrl,
  logoUrl,
  logoTitle,
  logoSize,
  showSearchBar,
  showLogin,
  iconClasses,
  labelClasses,
  collapsibleAnimation,
}) => {
  const { page } = useRuntime()

  const topMenuOptions = {
    linkUrl,
    logoUrl,
    logoTitle,
    logoSize,
    showSearchBar,
    showLogin,
    iconClasses,
    labelClasses,
    collapsibleAnimation,
  }

  const isLeanMode = () => {
    const acceptedPaths = new RegExp(leanWhen)
    return acceptedPaths.test(page)
  }

  return (
    <Fragment>
      <div
        className={`${styles.container} fixed top-0 z-4 w-100 ${
          isLeanMode() ? `${styles.leanMode}` : ''
        }`}
      >
        <TopMenu
          {...topMenuOptions}
          leanMode={isLeanMode()}
          extraHeaders={
            <div
              className="left-0 w-100"
              style={{
                transform: 'translateZ(0)', //Avoid shaking
              }}
            >
              <ExtensionPoint id="telemarketing" />
              <ExtensionPoint id="menu-link" />
            </div>
          }
        />
      </div>
      <Spacer />
    </Fragment>
  )
}

Header.propTypes = {
  /** Cases in which the menu is in lean mode */
  leanWhen: PropTypes.string,
  ...login.propTypes,
  ...searchBar.propTypes,
  ...icons.propTypes,
  ...logo.propTypes,
  ...collapsible.propTypes,
}

Header.defaultProps = {
  leanWhen: 'a^',
  ...login.defaultProps,
  ...searchBar.defaultProps,
  ...icons.defaultProps,
  ...logo.defaultProps,
  ...collapsible.defaultProps,
}

Header.schema = {
  title: 'editor.header.title',
  description: 'editor.header.description',
  type: 'object',
  properties: {
    logoUrl: {
      type: 'string',
      title: 'editor.header.logo.image',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    linkUrl: {
      type: 'string',
      title: 'editor.header.link.url',
    },
    showSearchBar: {
      title: 'editor.header.show.searchbar.title',
      type: 'boolean',
      default: true,
      isLayout: true,
    },
    showLogin: {
      title: 'editor.header.show.login.title',
      type: 'boolean',
      default: true,
      isLayout: true,
    },
  },
}

export default Header
