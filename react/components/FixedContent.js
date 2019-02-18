import React, { Fragment, useState } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { Container } from 'vtex.store-components'
import classNames from 'classnames'
import Logo from './Logo'
import SearchBar from './SearchBar'
import Buttons from './Buttons'
import useDevice from '../hooks/useDevice'
import { logo, icons, lean, searchBar, login } from '../defaults'

import styles from '../store-header.css'

/**
 * Component that deals with content thats always fixed on top
 * Also handles the toggle between mobile search and mobile navbar
 * @param {Boolean} leanMode - if it's leanMode
 * @param {String} logoUrl - url of the logo src
 * @param {String} linkUrl - url that logo should redirect
 * @param {String} logoTitle - alt of the logo
 * @param {Object} logoSize - sizes of logo on mobile and desktop
 * @param {Boolean} showSearchBar - if should show searchbar
 * @param {Boolean} showLogin - if should show login
 * @param {String} iconClasses - classes for icons
 * @param {String} labelClasses - classes for labels
 */
const FixedContent = ({
  leanMode,
  logoUrl,
  linkUrl,
  logoTitle,
  logoSize,
  showSearchBar,
  showLogin,
  iconClasses,
  labelClasses,
}) => {
  const [mobileSearchActive, toggleSearch] = useState(false)
  const { mobile, desktop } = useDevice()
  const containerClasses = classNames(
    `${styles.topMenuContainer} flex justify-center bg-base h3 bb bw0 b--white`
  )
  const contentClasses = classNames(
    'w-100 mw9 flex justify-center',
    leanMode ? 'pv0' : 'pv6-l pv2-m'
  )

  return (
    <Container
      className={containerClasses}
      style={{
        transform: 'translateZ(0)', //Avoid shaking
      }}
    >
      <div
        className={contentClasses}
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
            mobile &&
            showSearchBar && (
              <div className="flex justify-start pa2 relative w-100">
                <SearchBar
                  iconClasses={iconClasses}
                  onCancel={() => toggleSearch(false)}
                />
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

              <Logo
                logoUrl={logoUrl}
                logoTitle={logoTitle}
                linkUrl={linkUrl}
                logoSize={logoSize}
              />

              {!leanMode && desktop && showSearchBar && (
                <div className="dn db-ns flex-grow-1">
                  <SearchBar />
                </div>
              )}

              <Buttons
                iconClasses={iconClasses}
                labelClasses={labelClasses}
                showSearchBar={showSearchBar}
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
  ...lean.propTypes,
  ...login.propTypes,
  ...searchBar.propTypes,
  ...logo.propTypes,
  ...icons.propTypes,
}

FixedContent.defaultProps = {
  ...lean.defaultProps,
  ...login.defaultProps,
  ...searchBar.defaultProps,
  ...logo.defaultProps,
  ...icons.defaultProps,
}

export default FixedContent
