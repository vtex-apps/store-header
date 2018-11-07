import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { ExtensionPoint, Link } from 'render'
import { Button, IconSearch } from 'vtex.styleguide'
import classNames from 'classnames'
import ReactResizeDetector from 'react-resize-detector'

const LOGO_WIDTH_MOBILE = 90
const LOGO_WIDTH_DESKTOP = 150
const LOGO_HEIGHT_MOBILE = 30
const LOGO_HEIGHT_DESKTOP = 50
const MINICART_ICON_SIZE_MOBILE = 23
const MINICART_ICON_SIZE_DESKTOP = 30
const LOGIN_ICON_SIZE_MOBILE = 23
const LOGIN_ICON_SIZE_DESKTOP = 30
const SEARCH_ICON_SIZE_MOBILE = 20
const SEARCH_ICON_SIZE_DESKTOP = 30

class TopMenu extends Component {

  state = { searchActive: false }
  translate = id => this.props.intl.formatMessage({ id: `header.${id}` })

  renderLogo(mobileMode, logoUrl, logoTitle) {
    return (
      <div className="vtex-top-menu__logo flex justify-start w-25-m w-30-l">
        <Link to="/" className="outline-0">
          <ExtensionPoint
            id="logo"
            url={logoUrl}
            title={logoTitle}
            width={mobileMode ? LOGO_WIDTH_MOBILE : LOGO_WIDTH_DESKTOP}
            height={mobileMode ? LOGO_HEIGHT_MOBILE : LOGO_HEIGHT_DESKTOP}
          />
        </Link>
      </div>
    )
  }

  renderMobileMenu() {
    const { leanMode } = this.props
    return (
      !leanMode && <ExtensionPoint id="category-menu" mobileMode />
    )
  }

  renderSearchBar(mobileMode) {
    const { fixed, showSearchBar } = this.props
    const searchBar = <ExtensionPoint
      id="search-bar"
      placeholder={this.translate('search-placeholder')}
      emptyPlaceholder={this.translate('search-emptyPlaceholder')}
    />
    return showSearchBar && (
      <div className={`vtex-top-menu__search-bar flex pa2-m w-100 w-50-m w-40-l ${mobileMode ? 'order-2' : 'order-1'}`}>
        {mobileMode ? !fixed && searchBar : searchBar}
      </div>
    )
  }

  renderMobileSearchBar(searchActive) {
    return (
      <div className="flex justify-start pa2 relative w-100">
        <div className="w-80">
          <ExtensionPoint
            id="search-bar"
            emptyPlaceholder={this.translate('search-emptyPlaceholder')}
            compactMode
          />
        </div>
        <div className="w-20 vtex-button bw1 ba fw5 ttu br2 fw4 v-mid relative pv3 ph5 f6 bg-transparent b--transparent c-muted-1 hover-b--transparent hover-c-action-primary pointer ">
          <span onClick={e => this.setState({ searchActive: !searchActive })} >{this.translate('search-cancel')}</span>
        </div>
      </div>
    )
  }


  renderIcons(mobileMode) {
    const { leanMode, fixed, showLogin } = this.props
    const { searchActive } = this.state

    return (
      <div className={
        `vtex-top-menu__icons flex justify-end items-center w-25-m w-30-l ${mobileMode ? 'order-1 ml-auto' : 'order-2'}`
      }>
        <div className="mr7-m">
          {(mobileMode && fixed) && showLogin && <Button icon variation="tertiary" onClick={e => this.setState({ searchActive: !searchActive })}>
            <IconSearch size={mobileMode ? SEARCH_ICON_SIZE_MOBILE : SEARCH_ICON_SIZE_DESKTOP} color="gray" />
          </Button>}
          <ExtensionPoint
            id="login"
            iconClasses="gray"
            labelClasses="gray"
            iconSize={mobileMode ? LOGIN_ICON_SIZE_MOBILE : LOGIN_ICON_SIZE_DESKTOP}
            iconLabel={!mobileMode ? this.translate('topMenu.login.icon.label') : ''}
          />
        </div>
        {!leanMode && <ExtensionPoint
          id="minicart"
          iconClasses="gray"
          iconSize={mobileMode ? MINICART_ICON_SIZE_MOBILE : MINICART_ICON_SIZE_DESKTOP}
          iconLabel={!mobileMode ? this.translate('topMenu.minicart.icon.label') : ''}
          labelClasses="gray"
        />}
      </div>
    )
  }

  render() {
    const { logoUrl, logoTitle, leanMode, fixed } = this.props
    const { searchActive } = this.state
    const containerClasses = classNames(
      'vtex-top-menu flex justify-center w-100 bg-white',
      {
        'vtex-top-menu-fixed fixed bw1 bb b--light-gray top-0 z-999': fixed,
      },
      {
        'vtex-top-menu-static' : !fixed,
      }
    )
    return (
      <ReactResizeDetector handleWidth>
        {
          width => {
            const mobileMode = width < 640 || (global.__RUNTIME__.hints.mobile && (!width || width < 640))
            const contentClasses = `w-100 w-90-l center flex justify-center  ${mobileMode & !fixed ? 'pb4' : ''}  pv2-m pv6-l ph3-s ph7-m ph6-xl`
            return (
              <div className={containerClasses}>
                <div className={contentClasses}>
                  <div className="flex-wrap flex-nowrap-ns flex w-100 justify-between-m items-center">
                    {!searchActive && mobileMode && this.renderMobileMenu()}
                    {!searchActive && this.renderLogo(mobileMode, logoUrl, logoTitle)}
                    {!searchActive && !leanMode && this.renderSearchBar(mobileMode)}
                    {!searchActive && this.renderIcons(mobileMode)}
                    {(searchActive && this.renderMobileSearchBar(searchActive))}
                  </div>
                </div>
              </div>
            )
          }
        }
      </ReactResizeDetector>
    )
  }
}

TopMenu.propTypes = {
  logoUrl: PropTypes.string,
  logoTitle: PropTypes.string,
  showSearchBar: PropTypes.bool,
  showLogin: PropTypes.bool,
  leanMode: PropTypes.bool,
  fixed: PropTypes.bool,
  intl: intlShape.isRequired,
}

TopMenu.defaultProps = {
  fixed: false,
  showSearchBar: true,
  showLogin: true,
}

export default injectIntl(TopMenu)
