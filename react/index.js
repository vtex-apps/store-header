import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import hoistNonReactStatics from 'hoist-non-react-statics'

import Modal from './components/Modal'
import TopMenu from './components/TopMenu'

import { Alert } from 'vtex.styleguide'
import { ExtensionPoint } from 'render'

import {
  orderFormConsumer,
  contextPropTypes,
} from 'vtex.store/OrderFormContext'

import './global.css'

class Header extends Component {
  state = {
    showMenuPopup: false,
    leanMode: false,
    lastPathname: null
  }

  static propTypes = {
    name: PropTypes.string,
    logoUrl: PropTypes.string,
    logoTitle: PropTypes.string,
    leanWhen: PropTypes.string,
    intl: intlShape.isRequired,
    orderFormContext: contextPropTypes,
  }

  _root = React.createRef()

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll)

    this.handleScroll()
  }

  componentDidUpdate() {
    const { leanWhen } = this.props
    const { lastPathname } = this.state
    const pathname = window.location.pathname || ""
    if (!leanWhen || pathname === lastPathname) return 

    const acceptedPaths = new RegExp(leanWhen)
    this.setState({leanMode: acceptedPaths.test(pathname), lastPathname: pathname})
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
        showMenuPopup: false,
      })
    } else if (scroll >= scrollHeight) {
      this.setState({
        showMenuPopup: true,
      })
    }
  }

  render() {
    const { logoUrl, logoTitle, orderFormContext } = this.props
    const { showMenuPopup, leanMode } = this.state

    const offsetTop = (this._root.current && this._root.current.offsetTop) || 0

    const hasMessage =
      orderFormContext.message.text && orderFormContext.message.text !== ''

    return (
      <Fragment>
        <ExtensionPoint id="telemarketing" />
        <div
          className="vtex-header relative z-2 w-100 bb bw1 b--light-gray"
          ref={this._root}
        >
          <div className="z-2 items-center w-100 top-0 bg-white tl">
            <ExtensionPoint id="menu-link" />
          </div>
          <TopMenu logoUrl={logoUrl} logoTitle={logoTitle} leanMode={leanMode}/>
          {!leanMode && <ExtensionPoint id="category-menu" />}
          {showMenuPopup && (
            <Modal>
              <TopMenu
                logoUrl={logoUrl}
                logoTitle={logoTitle}
                leanMode={leanMode}
                fixed
              />
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
        'ui:widget': 'image-uploader',
      },
    }
  },
}

export default hoistNonReactStatics(orderFormConsumer(injectIntl(Header)), Header) 
