import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import hoistNonReactStatics from 'hoist-non-react-statics'
import TopMenu from './components/TopMenu'
import { Alert } from 'vtex.styleguide'
import { ExtensionPoint, withRuntimeContext } from 'render'

import {
  orderFormConsumer,
  contextPropTypes,
} from 'vtex.store/OrderFormContext'

import './global.css'

class Header extends Component {
  static propTypes = {
    name: PropTypes.string,
    linkUrl: PropTypes.string,
    logoUrl: PropTypes.string,
    logoTitle: PropTypes.string,
    leanWhen: PropTypes.string,
    intl: intlShape.isRequired,
    orderFormContext: contextPropTypes,
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
    const { logoUrl, logoTitle, orderFormContext, showSearchBar, showLogin } = this.props

    const leanMode = this.isLeanMode()

    const hasMessage =
      orderFormContext.message.text && orderFormContext.message.text !== ''

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
          <TopMenu {...topMenuOptions}>
            <ExtensionPoint id="telemarketing" />
            <div className="z-2 items-center w-100 top-0 bg-base tl">
              <ExtensionPoint id="menu-link" />
            </div>
          </TopMenu>

          <div
            className="flex flex-column items-center fixed w-100"
            style={{ top: 120 }}
          >
            {hasMessage && (
              <div className="pa2 mw9">
                <Alert
                  type={
                    orderFormContext.message.isSuccess ? 'success' : 'error'
                  }
                >
                  {orderFormContext.message.text}
                </Alert>
              </div>
            )}
          </div>
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

export default withRuntimeContext(
  hoistNonReactStatics(orderFormConsumer(injectIntl(Header)), Header)
)
