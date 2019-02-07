import React, { Fragment } from 'react'
import Logo from './Logo'
import SearchBar from './SearchBar'
import Icons from './Icons'

const ICON_CLASSES = "c-on-base"
const LABEL_CLASSES = "c-on-base"

const FixedContent = ({
    mobileSearchActive,
    leanMode,
    logoUrl,
    linkUrl,
    logoTitle,
    mobile,
    showSearchBar,
    showLogin
}) => (
    mobileSearchActive ? (
      <div className="flex justify-start pa2 pr4 pt3 relative w-100">
        <SearchBar
          compactMode
          autoFocus
          onCancel={() => "HAHA" }
        />
      </div>
    ) : (
        <Fragment>
          {/**!leanMode && <ExtensionPoint
        id="category-menu"
        iconClasses={ICON_CLASSES}
    /> */}

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

          {
            <Icons
              showSearch={showSearchBar}
              leanMode={leanMode}
              showLogin={showLogin}
              iconClasses={ICON_CLASSES}
              labelClasses={LABEL_CLASSES}
            />
           }
        </Fragment>
    )
)

export default FixedContent