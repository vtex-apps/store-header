import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { ExtensionPoint } from 'vtex.render-runtime'
import Logo from './Logo'
import SearchBar from './SearchBar'
import Icons from './Icons'
import { CONSTANTS } from './Helpers'
import { Container } from 'vtex.store-components'
import header from '../store-header.css'
import useDevice from '../hooks/useDevice'
import classNames from 'classnames'

/**
 * Component that deals with content thats always fixed on top.
 * Also handles the toggle between mobile search and mobile navbar.
 */
const FixedContent = ({
  leanMode,
  logoUrl,
  linkUrl,
  logoTitle,
  showSearchBar,
  showLogin,
  iconClasses,
  showBorder,
}) => {
  const [mobileSearchActive, toggleSearch] = useState(false)
  const { mobile, desktop } = useDevice()
  const containerClassNames = classNames(
    `${header.topMenuContainer} flex justify-center bg-base h3 bb bw0 b--white`,
    {
      'bb bw1 b--muted-4': showBorder,
    }
  )

  return (
    <Container
      className={containerClassNames}
      style={{
        transform: 'translateZ(0)', //Avoid shaking
        transition: 'all 500ms cubic-bezier(0.99, 0.26, 1, 1) 0ms',
        willChange: 'border-bottom',
      }}
    >
      <div
        className={`w-100 mw9 flex justify-center ${
          leanMode ? 'pv0' : 'pv6-l pv2-m'
        }`}
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
          }}
        >
          {mobileSearchActive ? (
            mobile && (
              <div className="flex justify-start pa2 relative w-100">
                <SearchBar autoFocus onCancel={() => toggleSearch(false)} />
              </div>
            )
          ) : (
            <Fragment>
              {!leanMode && mobile && (
                <ExtensionPoint
                  id="category-menu"
                  mobileMode
                  iconClasses={iconClasses}
                />
              )}

              <Logo src={logoUrl} link={linkUrl} title={logoTitle} />

              {!leanMode && desktop && (
                <div className="dn db-ns flex-grow-1">
                  <SearchBar />
                </div>
              )}

              {desktop && (
                <ExtensionPoint id="user-address" variation="inline" />
              )}
              <Icons
                showSearchIcon={showSearchBar}
                leanMode={leanMode}
                showLogin={showLogin}
                onActiveSearch={() => toggleSearch(true)}
              />
            </Fragment>
          )}
        </div>
      </div>
    </Container>
  )
}

FixedContent.propTypes = {
  /** If it is leanMode */
  leanMode: PropTypes.bool,
  /** Address opened when the user clicks the logo */
  linkUrl: PropTypes.string,
  /** URL of the logo image */
  logoUrl: PropTypes.string,
  /** Alt text for the logo */
  logoTitle: PropTypes.string,
  /** Sets whether the search bar is visible or not */
  showSearchBar: PropTypes.bool,
  /** Sets whether the login button is displayed or not*/
  showLogin: PropTypes.bool,
  /** Classes for icons */
  iconClasses: PropTypes.string,
  /** If it needs to show border bottom */
  showBorder: PropTypes.bool,
}

FixedContent.defaultProps = {
  leanMode: false,
  logoUrl: '',
  linkUrl: '',
  logoTitle: '',
  showSearchBar: true,
  showLogin: true,
  iconClasses: CONSTANTS.ICON.CLASS,
  showBorder: false,
}

export default FixedContent
