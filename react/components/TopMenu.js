import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { ExtensionPoint } from 'render'
import { Button, IconSearch } from 'vtex.styleguide'
import classNames from 'classnames'
import ReactResizeDetector from 'react-resize-detector'

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
    minHeight: null,
    maxHeight: null,
    heightReduction: 0,
  }

  renderLogo = () => {
    const { logoUrl, linkUrl, logoTitle } = this.props

    return (
      <div className="mr5" ref={this.logoContainer}>
        <Logo
          src={logoUrl}
          link={linkUrl}
          title={logoTitle}
          sizeDesktop={{width: LOGO_MAX_WIDTH_DESKTOP, height: LOGO_MAX_HEIGHT_DESKTOP}}
          sizeMobile={{width: LOGO_MAX_WIDTH_MOBILE, height: LOGO_MAX_HEIGHT_MOBILE}}
          onUpdateSize={this.handleLogoUpdateSize}
          />
      </div>
    )
  }

  renderMobileCategoryMenu = () => {
    <div className="db dn-ns">
      <ExtensionPoint id="category-menu" mobileMode />
    </div>
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll)

    this.handleScroll()
    this.handleUpdateDimensions()
  }

  componentDidUpdate(prevState) {
    if(prevState.mobileSearchActive !== this.state.mobileSearchActive){
      this.handleScroll()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const scroll = window.scrollY
    if (typeof scroll !== 'number') return

    const scrollValue = Math.min(1, scroll / Math.max(this.state.heightReduction, this.state.minHeight))

    this.updateLogoSize(scrollValue)
    this.updateTopBarSize(scrollValue)
    this.updateSearchButtonVisibility(scrollValue)

  }

  updateLogoSize = scrollValue => {
    const logoElement = this.logoContainer.current
    if (logoElement) {
      const targetScale = Math.min(1, LOGO_COLLAPSED_HEIGHT / this.state.logoHeight)
      const scale = 1 - (scrollValue * (1 - targetScale))
      logoElement.style.transform = `scale(${scale})`
    }
  }

  updateTopBarSize = scrollValue => {
    /** This function, instead of setting the height of the topbar, changes its 
     * position and the position of its contents. This is done for performance
     * (changing height triggers a reflow, which is expensive. Setting transform
     * only triggers a composition, which is cheap)
     * */


    /** This division/rounding/multiplication prevents the position from being a non-integer
     * on either elements, so as to not to become blurry on non-retina displays, and makes both
     * move in tandem, preventing "jumpiness" */
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

  updateSearchButtonVisibility = scrollValue => {
    const searchButtonElement = this.mobileSearchButton.current
    if (searchButtonElement) {
      searchButtonElement.style.opacity = scrollValue
    }
  }

  getContentPaddings = () => {
    const contentElement = this.content.current
    const contentComputedStyles = contentElement && window.getComputedStyle && window.getComputedStyle(contentElement, null)
    return contentComputedStyles ? parseFloat(contentComputedStyles.getPropertyValue('padding-top')) : 0
  }

  handleUpdateDimensions = () => {
    const contentPaddings = this.getContentPaddings()
    const logoReduction = Math.max(0, this.state.logoHeight - LOGO_COLLAPSED_HEIGHT)
    const heightReduction = Math.max(0, (contentPaddings * 2) + logoReduction)

    const maxHeight = this.container.current ? this.container.current.offsetHeight : 0
    const minHeight = maxHeight - heightReduction - (heightReduction % 2)

    this.setState({
      heightReduction,
      maxHeight,
      minHeight,
    }, () => {
      this.props.onUpdateDimensions({ minHeight, maxHeight })
    })
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

  renderIcons() {
    const { leanMode, showLogin, showSearchBar } = this.props

    return (
      <div className="vtex-top-menu__icons flex justify-end flex-grow-1 flex-grow-0-ns items-center order-1-s ml-auto-s order-2-ns">
        {/** Both desktop and mobile icons are rendered, and hidden through CSS,
          for better server side rendering support */}

        {/** Mobile icons */}
        <div className="flex dn-ns">
          {showSearchBar && !leanMode && (
            <div ref={this.mobileSearchButton} className="o-0">
              <Button
                icon
                variation="tertiary"
                onClick={() => this.setState(state => ({ mobileSearchActive: !state.mobileSearchActive }))}
              >
                <span className="c-muted-1"><IconSearch size={ICON_SIZE_MOBILE}/></span>
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
      </div>
    )
  }

  renderCollapsibleContent = () => (
    <div className="relative z-2 bg-base">
      <ExtensionPoint id="category-menu" />
      {this.props.showSearchBar && (
        <div className="dn-m pa2">
          <SearchBar />
        </div>
      )}
    </div>
  )

  render() {
    const { linkUrl, logoUrl, logoTitle, leanMode, fixed } = this.props
    const { searchActive } = this.state
    const containerClasses = classNames(
      'vtex-top-menu flex justify-center w-100 bg-base',
      {
        'vtex-top-menu-fixed fixed bw1 bb b--muted-4 top-0 z-999': fixed,
      },
      {
        'vtex-top-menu-static': !fixed,
      }
    )
    return (
      <ReactResizeDetector handleWidth>
        {
          width => {
            const mobileMode = width < 640 || (global.__RUNTIME__.hints.mobile && (!width || width < 640))
            const contentClasses = `w-100 center flex justify-center pv2-m pv6-l ph3 ph5-m ph8-l ph9-xl`
            return (
              <div className={containerClasses}>
                <div className={contentClasses}>
                  <div className="flex-wrap flex-nowrap-ns flex w-100 justify-between-m items-center">
                    {!searchActive && mobileMode && this.renderMobileMenu()}
                    {!searchActive && this.renderLogo(mobileMode, linkUrl, logoUrl, logoTitle)}
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
  linkUrl: PropTypes.string,
  logoUrl: PropTypes.string,
  logoTitle: PropTypes.string,
  showSearchBar: PropTypes.bool,
  showLogin: PropTypes.bool,
  leanMode: PropTypes.bool,
  onUpdateDimensions: PropTypes.func,
}

TopMenu.defaultProps = {
  showSearchBar: true,
  showLogin: true,
  onUpdateDimensions: () => {},
}

export default TopMenu
