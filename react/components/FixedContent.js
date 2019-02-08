import React, { Fragment } from 'react'
import Logo from './Logo'
import SearchBar from './SearchBar'
import Icons from './Icons'
import { CONSTANTS } from './Helpers'

const FixedContent = ({
    mobileSearchActive,
    leanMode,
    logoUrl,
    linkUrl,
    logoTitle,
    showSearchBar,
    showLogin,
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
            />
          }

          {!leanMode && (
            <div className="dn db-ns flex-grow-1">
              <SearchBar iconClasses={ CONSTANTS.ICON_CLASSES} />
            </div>
          )}

          {
            <Icons
              showSearch={showSearchBar}
              leanMode={leanMode}
              showLogin={showLogin}
              iconClasses={CONSTANTS.ICON_CLASSES}
              labelClasses={CONSTANTS.LABEL_CLASSES}
            />
           }
        </Fragment>
    )
)

export default FixedContent