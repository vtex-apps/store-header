import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import TopMenu from './components/TopMenu'
import { ExtensionPoint, withRuntimeContext } from 'render'

import './global.css'

class Header extends Component {
  static propTypes = {
    name: PropTypes.string,
    linkUrl: PropTypes.string,
    logoUrl: PropTypes.string,
    logoTitle: PropTypes.string,
    leanWhen: PropTypes.string,
    showSearchBar: PropTypes.bool,
    showLogin: PropTypes.bool,
    runtime: PropTypes.shape({
      page: PropTypes.string,
    }),
  }

  /** Determines an unmatching regex for default behavior of the leanMode */
  static defaultProps = {
    leanWhen: 'a^',
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
    const { logoUrl, linkUrl, logoTitle, showSearchBar, showLogin } = this.props

    const leanMode = this.isLeanMode()

    const topMenuOptions = {
      linkUrl,
      logoUrl,
      logoTitle,
      leanMode,
      showSearchBar,
      showLogin,
    }

    return (
      <Fragment>
        <div
          className={`vtex-header force-full-width relative z-2 ${leanMode ? 'vtex-header-lean-mode' : ''}`}
        >
          <TopMenu
            {...topMenuOptions}
            extraHeaders={(
              <ExtensionPoint id="telemarketing" />
              // TODO: either add support or remove menu-link
              // <div className="z-2 items-center w-100 top-0 bg-base tl">
              //   <ExtensionPoint id="menu-link" />
              // </div>
            )}
          />
        </div>
      </Fragment>
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
      title: 'editor.header.logo.title',
      widget: {
        'ui:widget': 'image-uploader',
      }
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
