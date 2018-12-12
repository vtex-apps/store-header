import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import hoistNonReactStatics from 'hoist-non-react-statics'
import TopMenu from './components/TopMenu'
import { ExtensionPoint, withRuntimeContext } from 'render'

import './global.css'

class Header extends Component {
  state = {
    showMenuPopup: false,
    leanMode: true,
  }

  static propTypes = {
    name: PropTypes.string,
    linkUrl: PropTypes.string,
    logoUrl: PropTypes.string,
    logoTitle: PropTypes.string,
    leanWhen: PropTypes.string,
    intl: intlShape.isRequired,
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

  _root = React.createRef()

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll)

    this.handleScroll()
  }

  isLeanMode = () => {
    const {
      leanWhen,
      runtime: { page },
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

    const showMenuPopup = scroll >= scrollHeight

    if (showMenuPopup !== this.state.showMenuPopup) {
      this.setState({
        showMenuPopup
      })
    }
  }

  render() {
    const { linkUrl, logoUrl, logoTitle, showSearchBar, showLogin } = this.props
    const { showMenuPopup } = this.state

    const leanMode = this.isLeanMode()
    const offsetTop = (this._root.current && this._root.current.offsetTop) || 0

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
        <ExtensionPoint id="telemarketing" />
        <div
          className={`vtex-header force-full-width relative z-2 w-100 bb bw1 b--muted-4 ${leanMode ? 'vtex-header-lean-mode' : ''}`}
          ref={this._root}
        >
          <div className="z-2 items-center w-100 top-0 bg-base tl">
            <ExtensionPoint id="menu-link" />
          </div>
          <TopMenu {...topMenuOptions} />
          {!leanMode && <ExtensionPoint id="category-menu" />}
          <div style={{ visibility: showMenuPopup ? 'inherit' : 'hidden' }}>
            <TopMenu fixed {...topMenuOptions} />
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
  hoistNonReactStatics(injectIntl(Header), Header)
)
