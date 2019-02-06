import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { ExtensionPoint } from 'vtex.render-runtime'
import ResizeDetector from 'react-resize-detector'

import { ButtonWithIcon } from 'vtex.styleguide'
import { IconSearch } from 'vtex.dreamstore-icons'
import { Container } from 'vtex.store-components'

import Logo from './Logo'
import SearchBar from './SearchBar'

import header from '../store-header.css'
import withScrollHandler from './ScrollHandler';

/**
 * Desing Correct
 */
const ICON_CLASSES = "c-on-base"
const LABEL_CLASSES = "c-on-base"

const HEIGHTS = {
  TELEMARKETING: 32,
  FIXED_CONTENT: 64
}

/**
 * To check
 */
const SCROLL_HOOK = 80

const getTransition = ( targetScale, origin, scroll) => {
    
  const applyWhen = scroll>= SCROLL_HOOK

  return({
    
    transform: applyWhen 
      ? `scale(${targetScale})` 
      : `scale(1)`,

    transition: 'all 500ms ease-in-out',
    transformOrigin: origin,
    willChange: 'transform'
  })
}

const TopMenu = ({
  extraHeaders,
  leanMode,
  mobileSearchActive=false,
  logoUrl,
  linkUrl,
  logoTitle,
  showLogin,
  showSearchBar,
  mobile
}) => {

  const renderIcons = () => (
      <div className={`${header.topMenuIcons} flex justify-end flex-grow-1 flex-grow-0-ns items-center order-1-s ml-auto-s order-2-ns`}>
        {/**
          * Both desktop and mobile icons are rendered, and hidden through CSS,
          * for better server side rendering support
         **/}
          {/* Mobile icons */}
          <div className="flex dn-ns mr3">
            {showSearchBar && !leanMode && (
              <div className="o-0 pv2 nl5">
                <ButtonWithIcon
                  variation="tertiary"
                  onClick={() => "ACTIVE MOBILE SEARCH"}
                >
                  <IconSearch className={ICON_CLASSES} />
                </ButtonWithIcon>
              </div>
            )}
            {showLogin && (
              <ExtensionPoint
                id="login"
                iconClasses={ICON_CLASSES}
                labelClasses={LABEL_CLASSES}
              />
            )}
            {!leanMode && <ExtensionPoint
              id="minicart"
              iconClasses={ICON_CLASSES}
              labelClasses={LABEL_CLASSES}
            />}
          </div>

          {/** Desktop icons */}
          <div className="dn flex-ns">
            {showLogin && (
              <ExtensionPoint
                id="login"
                iconClasses={ICON_CLASSES}
                labelClasses={LABEL_CLASSES}
                iconLabel={<FormattedMessage id="header.topMenu.login.icon.label" />}
              />
            )}
            {!leanMode && (
              <ExtensionPoint
                id="minicart"
                iconClasses={ICON_CLASSES}
                labelClasses={LABEL_CLASSES}
                iconLabel={<FormattedMessage id="header.topMenu.minicart.icon.label" />}
              />
            )}
          </div>
      </div> 
  )

  const renderCategoryMenu = () => (
    <ExtensionPoint
        id="category-menu"
        iconClasses={ICON_CLASSES}
    />
  )

  const renderFixedContent = () => (
    mobileSearchActive ? (
      <div className="flex justify-start pa2 pr4 pt3 relative w-100">
        <SearchBar
          compactMode
          autoFocus
          onCancel={() => "HAHA" }
        />
      </div>
    ) : (
        <React.Fragment>
          {/**!leanMode && renderCategoryMenu() */}

          { 
            <Logo
              src={logoUrl}
              link={linkUrl}
              title={logoTitle}
              mobile={mobile}
            />
          }

          {!leanMode && (
            <div className="dn db-ns flex-grow-1">
              <SearchBar iconClasses={ICON_CLASSES} />
            </div>
          )}

          { renderIcons() }
        </React.Fragment>
      )
  )

  const renderCollapsibleContent = () => (
    <div className="relative z-2 bg-base" style={{ top: HEIGHTS.FIXED_CONTENT + HEIGHTS.TELEMARKETING }}>
      <ExtensionPoint id="category-menu" />
      { showSearchBar && (
        <div className="dn-m">
          <SearchBar />
        </div>
      )}
    </div>
  )

  return(
    <Fragment>
      
      <div className="fixed top-0 left-0 w-100 z-4 h2" style={{ transform: 'translateZ(0)' }}>
        {extraHeaders}
      </div>

      <Container
        className={`${header.topMenuContainer} flex justify-center w-100 bg-base left-0 z-3 fixed h3`}
        style={{
          top: 32,
        }}
      >
        <div
          className={`w-100 mw9 flex justify-center ${leanMode ? 'pv0' : 'pv6-l pv2-m'}`}
          style={{
            /** Prevents the empty margins of this element from blocking the users clicks
              * TODO: create a tachyons class for pointer events and remove this style
              * @author lbebber */
            pointerEvents: 'none',
          }}
        >
          <div
            className="flex w-100 justify-between-m items-center pv3"
            style={{
              pointerEvents: 'auto',
            }}>
              {renderFixedContent()}
          </div>
        </div>
      </Container>

      {!leanMode && renderCollapsibleContent()}

    </Fragment>
  )
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
  mobile: PropTypes.bool
}

TopMenu.defaultProps = {
  showSearchBar: true,
  showLogin: true,
  onUpdateDimensions: () => { },
}

export default withScrollHandler(TopMenu)