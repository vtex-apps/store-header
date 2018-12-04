import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { ExtensionPoint } from 'render'
import { Button, IconSearch } from 'vtex.styleguide'
import ReactResizeDetector from 'react-resize-detector'
import {Adopt} from 'react-adopt'
import Logo from './Logo'

const LOGO_MAX_WIDTH_DESKTOP = 150
const LOGO_MAX_WIDTH_MOBILE = 90
const LOGO_MAX_HEIGHT_MOBILE = 30
const LOGO_MAX_HEIGHT_DESKTOP = 75
const LOGO_COLLAPSED_HEIGHT_DESKTOP = 50
const HEIGHT_REDUCTION_DESKTOP = 40
const HEIGHT_REDUCTION_TABLET = 10
const HEIGHT_REDUCTION_MOBILE = 0
const MINICART_ICON_SIZE_MOBILE = 22
const MINICART_ICON_SIZE_DESKTOP = 30
const LOGIN_ICON_SIZE_MOBILE = 22
const LOGIN_ICON_SIZE_DESKTOP = 30
const SEARCH_ICON_SIZE_MOBILE = 22
const SEARCH_ICON_SIZE_DESKTOP = 30

class TopBar extends Component {
  constructor(props) {
    super(props)

    this.container = React.createRef()
    this.content = React.createRef()
    this.logoContainer = React.createRef()
  }

  state = {
    searchActive: false,
    logoHeight: null,
    heightReduction: HEIGHT_REDUCTION_MOBILE,
  }

  renderMobileMenu() {
    const { leanMode } = this.props
    return (
      !leanMode && <ExtensionPoint id="category-menu" mobileMode />
    )
  }

  renderSearchBar(mobileMode) {
    const { fixed, showSearchBar } = this.props
    const searchBar = (
      <Adopt
        mapper={{
          placeholder: <FormattedMessage id='header.search-placeholder' />,
          emptyPlaceholder: <FormattedMessage id='header.search-emptyPlaceholder' />,
        }}
      >
        {({placeholder, emptyPlaceholder}) => (
          <ExtensionPoint
            id="search-bar"
            placeholder={placeholder}
            emptyPlaceholder={emptyPlaceholder}
          />
        )}
      </Adopt>
    )

    return showSearchBar && (
      <div className={`vtex-top-menu__search-bar flex pa2-m flex-grow-1 justify-center ${mobileMode ? 'order-2' : 'order-1'}`}>
        <div className="w-100 mw7">
          {mobileMode ? !fixed && searchBar : searchBar}
        </div>
      </div>
    )
  }

  renderMobileSearchBar(searchActive) {
    return (
      <div className="flex justify-start pa2 pr4 pt3 relative w-100">
        <div className="w-80">
          <Adopt
            mapper={{
              emptyPlaceholder: <FormattedMessage id='header.search-emptyPlaceholder' />
            }}
          >
            {({emptyPlaceholder}) => (
              <ExtensionPoint
                id="search-bar"
                emptyPlaceholder={emptyPlaceholder}
                compactMode
              />
            )}
          </Adopt>
        </div>
        <div className="w-20 pl0"><Button size="small" variation="tertiary" onClick={e => this.setState({ searchActive: !searchActive })} >CANCEL</Button>
        </div>
      </div>
    )
  }


  renderIcons(mobileMode) {
    const { leanMode, fixed, showLogin, showSearchBar } = this.props
    const { searchActive } = this.state

    return (
      <div className={
        `vtex-top-menu__icons flex justify-end items-center ${mobileMode ? 'order-1 ml-auto' : 'order-2'}`
      }>
        <div className="mr7-m">
          {(mobileMode && fixed && showSearchBar) && showLogin && <Button icon variation="tertiary" onClick={e => this.setState({ searchActive: !searchActive })}>
            <IconSearch size={mobileMode ? SEARCH_ICON_SIZE_MOBILE : SEARCH_ICON_SIZE_DESKTOP} color="gray" />
          </Button>}
          <ExtensionPoint
            id="login"
            iconClasses="gray"
            labelClasses="gray"
            iconSize={mobileMode ? LOGIN_ICON_SIZE_MOBILE : LOGIN_ICON_SIZE_DESKTOP}
            iconLabel={!mobileMode ? <FormattedMessage id="header.topMenu.login.icon.label" /> : ''}
          />
        </div>
        {!leanMode && <ExtensionPoint
          id="minicart"
          iconClasses="gray"
          iconSize={mobileMode ? MINICART_ICON_SIZE_MOBILE : MINICART_ICON_SIZE_DESKTOP}
          iconLabel={!mobileMode ? <FormattedMessage id="header.topMenu.minicart.icon.label" /> : ''}
          labelClasses="gray"
        />}
      </div>
    )
  }

  getMaxHeight = () => {
    return this.container.current ? this.container.current.scrollHeight : 0
  }

  getMinHeight = () => {
    const maxHeight = this.getMaxHeight()
    return maxHeight - this.state.heightReduction
  }

  squish = value => {
    const totalHeightReduction = this.state.heightReduction

    const p = Math.min(1, value / totalHeightReduction)
    const logoElement = this.logoContainer.current
    const containerElement = this.container.current
    const contentElement = this.content.current

    if (logoElement) {
      const targetScale = Math.min(1, LOGO_COLLAPSED_HEIGHT_DESKTOP/this.state.logoHeight)
      const scale = 1-(p*(1-targetScale))
      logoElement.style.transform = `scale(${scale})`
    }

    const heightReduction = Math.round((p*totalHeightReduction)/2)*2
    if (containerElement) {
      const offset = heightReduction
      containerElement.style.transform = `translate3d(0, ${-offset}px, 0)`
    }

    if (contentElement) {
      const offset = heightReduction * 0.5
      contentElement.style.transform = `translate3d(0, ${offset}px, 0)`
    }
  }

  handleUpdateDimensions = () => {
    const contentElement = this.content.current
    const contentComputedStyles = contentElement && window && window.getComputedStyle(contentElement, null)
    const contentPaddings = contentComputedStyles ? parseFloat(contentComputedStyles.getPropertyValue('padding-top')) : 0
    const logoReduction = Math.max(0, this.state.logoHeight - LOGO_COLLAPSED_HEIGHT_DESKTOP)
    const minPadding = 3
    const heightReduction = ((contentPaddings - minPadding) * 2) + logoReduction

    this.setState({
      heightReduction,
    }, () => {
      this.props.onUpdateDimensions({
        minHeight: this.getMinHeight(),
        maxHeight: this.getMaxHeight(),
      })
    })
  }

  handleLogoResize = (width, height) => {
    this.setState({
      logoHeight: height,
    }, () => {
      this.handleUpdateDimensions()
    })
  }

  render() {
    const { logoUrl, linkUrl, logoTitle, leanMode } = this.props
    const { searchActive } = this.state
    const containerClasses = 'vtex-top-menu flex justify-center w-100 bg-base'
    return (
      <ReactResizeDetector handleWidth onResize={this.handleUpdateDimensions}>
        {width => {
          const mobileMode = width < 640 || (global.__RUNTIME__.hints.mobile && (!width || width < 640))
          const contentClasses = `w-100 w-90-l center flex justify-center pv6-l pv2-m ph3-s ph7-m ph6-xl`

          return (
            <div className={containerClasses} ref={this.container}>
              <div className={contentClasses} ref={this.content}>
                <div className="flex-wrap flex-nowrap-ns flex w-100 justify-between-m items-center">
                  {!searchActive && mobileMode && this.renderMobileMenu()}
                  {!searchActive && (
                    <div className="mr5" ref={this.logoContainer}>
                      <Logo
                        src={logoUrl}
                        link={linkUrl}
                        title={logoTitle}
                        maxWidth={mobileMode ? LOGO_MAX_WIDTH_MOBILE : LOGO_MAX_WIDTH_DESKTOP}
                        maxHeight={mobileMode ? LOGO_MAX_HEIGHT_MOBILE : LOGO_MAX_HEIGHT_DESKTOP}
                        onResize={this.handleLogoResize}
                      />
                    </div>
                  )}
                  {!searchActive && !leanMode && this.renderSearchBar(mobileMode)}
                  {!searchActive && this.renderIcons(mobileMode)}
                  {(searchActive && this.renderMobileSearchBar(searchActive))}
                </div>
              </div>
            </div>
          )
        }}
      </ReactResizeDetector>
    )
  }
}

TopBar.propTypes = {
  logoUrl: PropTypes.string,
  logoTitle: PropTypes.string,
  showSearchBar: PropTypes.bool,
  showLogin: PropTypes.bool,
  leanMode: PropTypes.bool,
  fixed: PropTypes.bool,
  onUpdateDimensions: PropTypes.func,
}

TopBar.defaultProps = {
  fixed: false,
  showSearchBar: true,
  showLogin: true,
  onUpdateDimensions: () => {},
}

export default TopBar
