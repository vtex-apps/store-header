import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { ExtensionPoint, withRuntimeContext } from 'vtex.render-runtime'

import TopMenu from './components/TopMenu'

import header from './store-header.css'

class Header extends Component {
  static propTypes = {
    /** Address opened when the user clicks the logo */
    linkUrl: PropTypes.string,
    /** URL of the logo image */
    logoUrl: PropTypes.string,
    /** Alt text for the logo */
    logoTitle: PropTypes.string,
    /** Cases in which the menu is in lean mode */
    leanWhen: PropTypes.string,
    /** Sets whether the search bar is visible or not */
    showSearchBar: PropTypes.bool,
    /** Sets whether the login button is displayed or not*/
    showLogin: PropTypes.bool,
    /** Used to receive runtime context */
    runtime: PropTypes.shape({
      page: PropTypes.string,
    }),
  }

  /** Determines an unmatching regex for default behavior of the leanMode */
  static defaultProps = {
    leanWhen: 'a^',
    linkUrl: "/"
  }

  isLeanMode = () => {
    const {
      leanWhen,
      runtime: { page },
    } = this.props
    const acceptedPaths = new RegExp(leanWhen)
    return acceptedPaths.test(page)
  }

  render() {
    const { logoUrl, logoTitle, showSearchBar, showLogin, linkUrl } = this.props

    const leanMode = this.isLeanMode()

    const topMenuOptions = {
      linkUrl,
      logoUrl,
      logoTitle,
      showSearchBar,
      showLogin,
    }

    return (
      <div
        className={`${header.container} relative z-2 ${leanMode ? `${header.leanMode}` : ''}`}
      >
        <TopMenu
          {...topMenuOptions}
          leanMode={leanMode}
          extraHeaders={(
            <Fragment>
              <ExtensionPoint id="telemarketing" />
              <div className="z-2 items-center w-100 top-0 bg-base tl">
                <ExtensionPoint id="menu-link" />
              </div>
            </Fragment>
          )}
        />
      </div>
    )
  }
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
      }
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
    }
  }
}

export default withRuntimeContext(Header)
