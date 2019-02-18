import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { ExtensionPoint, useRuntime } from 'vtex.render-runtime'
import TopMenu from './components/TopMenu'
import header from './store-header.css'
import { Spacer } from './components/Helpers'
import useDevice from './hooks/useDevice'
import { CONSTANTS } from './components/constants'
import { logo, collapsible } from './defaults'

const Header = ({
  leanWhen,
  linkUrl,
  logoUrl,
  logoTitle,
  showSearchBar,
  showLogin,
  collapsibleAnimation,
}) => {
  const { page } = useRuntime()
  const { desktop } = useDevice()

  const topMenuOptions = {
    linkUrl,
    logoUrl,
    logoTitle,
    showSearchBar,
    showLogin,
    collapsibleAnimation,
  }

  const spacerHeight = desktop
    ? CONSTANTS.SPACER.DESKTOP
    : CONSTANTS.SPACER.MOBILE

  const isLeanMode = () => {
    const acceptedPaths = new RegExp(leanWhen)
    return acceptedPaths.test(page)
  }

  return (
    <Fragment>
      <div
        className={`${header.container} fixed top-0 z-4 w-100 ${
          isLeanMode() ? `${header.leanMode}` : ''
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
      <Spacer height={spacerHeight} />
    </Fragment>
  )
}

Header.propTypes = {
  /** Cases in which the menu is in lean mode */
  leanWhen: PropTypes.string,
  /** Sets whether the search bar is visible or not */
  showSearchBar: PropTypes.bool,
  /** Sets whether the login button is displayed or not*/
  showLogin: PropTypes.bool,
  ...logo.propTypes,
  ...collapsible.propTypes,
}

Header.defaultProps = {
  leanWhen: 'a^',
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
