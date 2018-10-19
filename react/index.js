import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'

import Modal from './components/Modal'
import TopMenu from './components/TopMenu'

import { Alert } from 'vtex.styleguide'
import { ExtensionPoint, withRuntimeContext } from 'render'

import {
  orderFormConsumer,
  contextPropTypes,
} from 'vtex.store/OrderFormContext'

import './global.css'

class Header extends Component {
  state = {
    showMenuPopup: false,
  }

  static propTypes = {
    name: PropTypes.string,
    logoUrl: PropTypes.string,
    logoTitle: PropTypes.string,
    orderFormContext: contextPropTypes,
    runtime: PropTypes.shape({
      page: PropTypes.string,
    })
  }

  _root = React.createRef()

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll)

    this.handleScroll()
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
    const { logoUrl, logoTitle, orderFormContext, runtime: { page } } = this.props
    const { showMenuPopup } = this.state

    const isInCheckout = page && page.startsWith('store/checkout')

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
          <TopMenu logoUrl={logoUrl} logoTitle={logoTitle} isInCheckout={isInCheckout} />
          {!isInCheckout && <ExtensionPoint id="category-menu" />}
          {!isInCheckout && showMenuPopup && (
            <Modal>
              <TopMenu
                logoUrl={logoUrl}
                logoTitle={logoTitle}
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
    },
  },
}

export default hoistNonReactStatics(orderFormConsumer(withRuntimeContext(Header)), Header) 
