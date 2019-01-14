import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { ExtensionPoint } from 'render'
import ResizeDetector from 'react-resize-detector'

import { Button, IconSearch } from 'vtex.styleguide'
import { Container } from 'vtex.store-components'

import Logo from './Logo'
import SearchBar from './SearchBar'

import header from '../store-header.css'

const LOGO_MAX_WIDTH_DESKTOP = 150
const LOGO_MAX_WIDTH_MOBILE = 90
const LOGO_MAX_HEIGHT_MOBILE = 40
const LOGO_MAX_HEIGHT_DESKTOP = 75
const LOGO_COLLAPSED_HEIGHT = 40
const ICON_SIZE_MOBILE = 22
const ICON_SIZE_DESKTOP = 30

class TopMenu extends Component {
  container = React.createRef()
  content = React.createRef()
  logoContainer = React.createRef()
  mobileSearchButton = React.createRef()

  state = {
    mobileSearchActive: false,
    logoHeight: null,
    iconsHeight: null,
    minHeight: null,
    maxHeight: null,
    heightReduction: 0,
    extraHeadersHeight: 0,
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll)

    this.handleScroll()
    this.handleUpdateDimensions()
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate(prevState) {
    if (prevState.mobileSearchActive !== this.state.mobileSearchActive) {
      this.handleScroll()
    }
  }

  handleScroll = () => {
    // If it's in leanMode, pretend it's scrolled all the way to the bottom,
    // in order to make it look compressed
    const scroll = this.props.leanMode ? Infinity : window.scrollY

    if (typeof scroll !== 'number') return

    const scrollValue = Math.min(1, scroll / Math.max(this.state.heightReduction, this.state.minHeight))

    this.updateLogoScroll(scrollValue)
    this.updateTopBarScroll(scrollValue)
    this.updateSearchButtonScroll(scrollValue)
  }

  updateLogoScroll = scrollValue => {
    const logoElement = this.logoContainer.current
    if (logoElement) {
      const targetScale = Math.min(1, LOGO_COLLAPSED_HEIGHT / this.state.logoHeight)
      const scale = 1 - (scrollValue * (1 - targetScale))
      logoElement.style.transform = `scale(${scale})`
    }
  }

  /**
   * This function, instead of setting the height of the topbar, changes its
   * position and the position of its contents. This is done for performance
   * (changing height triggers a reflow, which is expensive. Setting transform
   * only triggers a composition, which is cheap)
  **/
  updateTopBarScroll = scrollValue => {
    // This division/rounding/multiplication prevents the position from being a non-integer
    // on either elements, so as to not to become blurry on non-retina displays, and makes both
    // move in tandem, preventing "jumpiness"
    const currentHeightReduction = Math.round((scrollValue * this.state.heightReduction) / 2) * 2

    const containerElement = this.container.current
    if (containerElement) {
      const offset = currentHeightReduction
      containerElement.style.transform = `translate3d(0, ${-offset}px, 0)`
    }

    const contentElement = this.content.current
    if (contentElement) {
      const offset = currentHeightReduction * 0.5
      contentElement.style.transform = `translate3d(0, ${offset}px, 0)`
    }
  }

  updateSearchButtonScroll = scrollValue => {
    const searchButtonElement = this.mobileSearchButton.current
    if (searchButtonElement) {
      searchButtonElement.style.opacity = scrollValue
    }
  }

  getContentPaddings = () => {
    // Gets the calculated vertical paddings of the content container
    const contentElement = this.content.current
    const contentComputedStyles = contentElement && window.getComputedStyle && window.getComputedStyle(contentElement, null)
    return contentComputedStyles ? parseFloat(contentComputedStyles.getPropertyValue('padding-top')) * 2 : 0
  }

  handleUpdateIconsDimensions = (width, height) => {
    this.setState({
      iconsHeight: height,
    }, () => {
      this.handleUpdateDimensions()
    })
  }

  handleUpdateLogoDimensions = (width, height) => {
    this.setState({
      logoHeight: height,
    }, () => {
      this.handleUpdateDimensions()
    })
  }

  handleUpdateDimensions = () => {
    const contentPaddings = this.getContentPaddings()
    const logoReduction = Math.max(0, this.state.logoHeight - Math.max(this.state.iconsHeight, LOGO_COLLAPSED_HEIGHT))
    const heightReduction = Math.max(0, contentPaddings + logoReduction)

    const maxHeight = (this.container.current ? this.container.current.offsetHeight : 0) + this.state.extraHeadersHeight
    const minHeight = maxHeight - heightReduction - (heightReduction % 2)

    this.setState({
      heightReduction,
      maxHeight,
      minHeight,
    }, () => {
      this.props.onUpdateDimensions({ minHeight, maxHeight })
    })
  }

  handleExtraHeadersResize = (width, height) => {
    this.setState({
      extraHeadersHeight: height,
    }, () => {
      this.handleUpdateDimensions()
    })
  }

  renderLogo = () => {
    const { logoUrl, linkUrl, logoTitle, leanMode } = this.props

    const sizeDesktop = { width: LOGO_MAX_WIDTH_DESKTOP, height: LOGO_MAX_HEIGHT_DESKTOP }
    const sizeMobile = { width: LOGO_MAX_WIDTH_MOBILE, height: LOGO_MAX_HEIGHT_MOBILE }

    return (
      <div className="mr5" ref={this.logoContainer}>
        <Logo
          src={logoUrl}
          link={linkUrl}
          title={logoTitle}
          sizeDesktop={leanMode ? sizeMobile : sizeDesktop}
          sizeMobile={sizeMobile}
          onResize={this.handleUpdateLogoDimensions}
        />
      </div>
    )
  }

  renderMobileCategoryMenu = () => (
    <aside className="db dn-ns">
      <ExtensionPoint id="category-menu" mobileMode />
    </aside>
  )

  renderIcons() {
    const { leanMode, showLogin, showSearchBar } = this.props

    return (
      <div className={`${header.topMenuIcons} flex justify-end flex-grow-1 flex-grow-0-ns items-center order-1-s ml-auto-s order-2-ns`}>
        {/**
          * Both desktop and mobile icons are rendered, and hidden through CSS,
          * for better server side rendering support
         **/}
        <ResizeDetector handleHeight onResize={this.handleUpdateIconsDimensions}>
          {/* Mobile icons */}
          <div className="flex dn-ns">
            {showSearchBar && !leanMode && (
              <div ref={this.mobileSearchButton} className="o-0">
                <Button
                  icon
                  variation="tertiary"
                  onClick={() => this.setState(state => ({ mobileSearchActive: !state.mobileSearchActive }))}
                >
                  <span className="c-muted-1"><IconSearch size={ICON_SIZE_MOBILE} /></span>
                </Button>
              </div>
            )}
            {showLogin && (
              <ExtensionPoint
                id="login"
                iconClasses="c-muted-1"
                labelClasses="c-muted-1"
                iconSize={ICON_SIZE_MOBILE}
              />
            )}
            {!leanMode && <ExtensionPoint
              id="minicart"
              iconClasses="c-muted-1"
              labelClasses="c-muted-1"
              iconSize={ICON_SIZE_MOBILE}
            />}
          </div>
          {/** Desktop icons */}
          <div className="dn flex-ns">
            {showLogin && (
              <ExtensionPoint
                id="login"
                iconClasses="c-muted-1"
                labelClasses="c-muted-1"
                iconSize={ICON_SIZE_DESKTOP}
                iconLabel={<FormattedMessage id="header.topMenu.login.icon.label" />}
              />
            )}
            {!leanMode && (
              <ExtensionPoint
                id="minicart"
                iconClasses="c-muted-1"
                labelClasses="c-muted-1"
                iconSize={ICON_SIZE_DESKTOP}
                iconLabel={<FormattedMessage id="header.topMenu.minicart.icon.label" />}
              />
            )}
          </div>
        </ResizeDetector>
      </div>
    )
  }

  renderFixedContent = () => {
    const { leanMode } = this.props
    const { mobileSearchActive } = this.state

    return mobileSearchActive ? (
      <div className="flex justify-start pa2 pr4 pt3 relative w-100">
        <SearchBar
          compactMode
          autoFocus
          onCancel={() => this.setState({ mobileSearchActive: false })}
        />
      </div>
    ) : (
        <React.Fragment>
          {!leanMode && this.renderMobileCategoryMenu()}
          {this.renderLogo()}
          {!leanMode && (
            <div className="dn db-ns flex-grow-1">
              <SearchBar />
            </div>
          )}
          {this.renderIcons()}
        </React.Fragment>
      )
  }

  renderCollapsibleContent = () => (
    <navbar className="relative z-2 bg-base">
      <ExtensionPoint id="category-menu" />
      {this.props.showSearchBar && (
        <div className="dn-m">
          <SearchBar />
        </div>
      )}
    </navbar>
  )

  render() {
    const { leanMode, extraHeaders } = this.props
    const { maxHeight, minHeight, extraHeadersHeight } = this.state

    const hasCalculatedMenuHeight = typeof maxHeight === 'number'

    return (
      <ResizeDetector handleWidth onResize={this.handleUpdateDimensions}>
        <div className="fixed top-0 left-0 w-100 z-4">
          <ResizeDetector handleHeight onResize={this.handleExtraHeadersResize}>
            {extraHeaders}
          </ResizeDetector>
        </div>
        <Container
          className={`${header.topMenuContainer} flex justify-center w-100 bg-base left-0 z-3 ${hasCalculatedMenuHeight ? 'fixed' : 'relative'}`}
          ref={this.container}
          style={{
            top: extraHeadersHeight,
          }}
        >
          <div
            className={`w-100 mw9 flex justify-center ${leanMode ? 'pv0' : 'pv6-l pv2-m'}`}
            ref={this.content}
            style={{
              // Prevents the empty margins of this element from blocking the users clicks
              // TODO: create a tachyons class for pointer events and remove this style
              pointerEvents: 'none',
            }}
          >
            <div
              className="flex w-100 justify-between-m items-center pv3"
              style={{
                pointerEvents: 'auto',
              }}>
              {this.renderFixedContent()}
            </div>
          </div>
        </Container>

        {hasCalculatedMenuHeight && (
          <React.Fragment>
            {/* This is a spacer to push down the page's content, since the menu
          itself is fixed and doesn't affect the page's layout */}
            <div
              className="bg-base w-100 z-2 relative"
              style={{
                height: leanMode ? minHeight : maxHeight,
              }}
            />

            {/* This is a border below the fixed menu. Its z-index is under
          the collapsible contents, so it's only visible when the collapsible
          menu scrolls out of view */}
            <div
              className="fixed top-0 left-0 w-100 bb bw1 b--muted-4"
              style={{
                height: minHeight,
                boxSizing: 'content-box',
              }}
            />
          </React.Fragment>
        )}
        {!leanMode && this.renderCollapsibleContent()}
        {/* This is a border below the collapsible menu. It scrolls out of
        view along with the menu */}
        <div className="bb bw1 b--muted-4" />
      </ResizeDetector>
    )
  }
}

TopMenu.propTypes = {
  linkUrl: PropTypes.string,
  logoUrl: PropTypes.string,
  logoTitle: PropTypes.string,
  showSearchBar: PropTypes.bool,
  showLogin: PropTypes.bool,
  leanMode: PropTypes.bool,
  onUpdateDimensions: PropTypes.func,
  extraHeaders: PropTypes.node,
}

TopMenu.defaultProps = {
  showSearchBar: true,
  showLogin: true,
  onUpdateDimensions: () => { },
}

export default TopMenu
