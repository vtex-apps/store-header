import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import hoistNonReactStatics from 'hoist-non-react-statics'

import Modal from './components/Modal'
import TopMenu from './components/TopMenu'

import { Alert } from 'vtex.styleguide'
import { ExtensionPoint, withRuntimeContext } from 'render'

import {
  orderFormConsumer,
  contextPropTypes
} from 'vtex.store/OrderFormContext'

import './global.css'

class Header extends Component {
  state = {
    showMenuPopup: false,
    leanMode: true
  }

  static propTypes = {
    name: PropTypes.string,
    logoUrl: PropTypes.string,
    logoTitle: PropTypes.string,
    leanWhen: PropTypes.string,
    intl: intlShape.isRequired,
    orderFormContext: contextPropTypes,
    showSearchBar: PropTypes.boolean,
    showLogin: PropTypes.boolean,
  }

  /** Determines an unmatching regex for default behavior of the leanMode */
  static defaultProps = {
    leanWhen: 'a^'
  }

  _root = React.createRef()

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll)

    this.handleScroll()
  }

  isLeanMode = () => {
    const {
      leanWhen,
      runtime: { page }
    } = this.props
    const acceptedPaths = new RegExp(leanWhen)
    return acceptedPaths.test(page)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    if (!this._root.current) {
      return
    }

    const scroll = window.scrollY
    const { scrollHeight } = this._root.current

    if (scroll < scrollHeight && this.state.showMenuPopup) {
      this.setState({
        showMenuPopup: false
      })
    } else if (scroll >= scrollHeight) {
      this.setState({
        showMenuPopup: true
      })
    }
  }

  render() {
    const { logoUrl, logoTitle, orderFormContext, showSearchBar, showLogin } = this.props
    const { showMenuPopup } = this.state

    const leanMode = this.isLeanMode()
    const offsetTop = (this._root.current && this._root.current.offsetTop) || 0

    const hasMessage =
      orderFormContext.message.text && orderFormContext.message.text !== ''

    const topMenuOptions = {
      logoUrl,
      logoTitle,
      leanMode,
      fixed: showMenuPopup,
      showSearchBar,
      showLogin,
    }

    return (
      <Fragment>
        <ExtensionPoint id="telemarketing" />
        <div
          className={`vtex-header relative z-2 w-100 bb bw1 b--light-gray ${leanMode ? 'vtex-header-lean-mode' : ''}`}
          ref={this._root}
        >
          <div className="z-2 items-center w-100 top-0 bg-white tl">
            <ExtensionPoint id="menu-link" />
          </div>
          <TopMenu {...topMenuOptions} />
          {!leanMode && <ExtensionPoint id="category-menu" />}
          {showMenuPopup && (
            <Modal>
              <TopMenu {...topMenuOptions} />
            </Modal>
          )}
          <div
            className="flex flex-column items-center fixed w-100"
            style={{ top: offsetTop + 120 }}
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
        'ui:widget': 'image-uploader'
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
