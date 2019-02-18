import React, { Fragment, useState } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { Container } from 'vtex.store-components'
import classNames from 'classnames'
import Logo from './Logo'
import SearchBar from './SearchBar'
import Icons from './Icons'
import useDevice from '../hooks/useDevice'
import { logo, icons, lean } from '../defaults'

import header from '../store-header.css'

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
  logoSize,
}) => {
  const [mobileSearchActive, toggleSearch] = useState(false)
  const { mobile, desktop } = useDevice()
  const containerClassNames = classNames(
    `${header.topMenuContainer} flex justify-center bg-base h3 bb bw0 b--white`
  )

  return (
    <Container
      className={containerClassNames}
      style={{
        transform: 'translateZ(0)', //Avoid shaking
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

              <Logo
                logoUrl={logoUrl}
                logoTitle={logoTitle}
                linkUrl={linkUrl}
                logoSize={logoSize}
              />

              {!leanMode && desktop && (
                <div className="dn db-ns flex-grow-1">
                  <SearchBar />
                </div>
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
  ...lean.propTypes,
  ...logo.propTypes,
  ...icons.propTypes,
}

FixedContent.defaultProps = {
  ...lean.defaultProps,
  ...logo.defaultProps,
  ...icons.defaultProps,
}

export default FixedContent
