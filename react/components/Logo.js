import React from 'react'
import { ExtensionPoint, Link } from 'vtex.render-runtime'
import useDevice from '../hooks/useDevice'
import { logo } from '../defaults'

import header from '../store-header.css'

const Logo = ({ logoUrl, logoTitle, linkUrl, logoSize }) => {
  const { mobile, desktop } = useDevice()

  return (
    <div className={`${header.topMenuLogo} pv2 mr5`}>
      <Link to={linkUrl} className={`outline-0 ${header.logoLink}`}>
        {mobile && (
          <div className="db dn-ns">
            <ExtensionPoint
              id="logo"
              url={logoUrl}
              title={logoTitle}
              width={logoSize.mobile.width}
              height={logoSize.mobile.height}
              isMobile={true}
            />
          </div>
        )}

        {desktop && (
          <div className="dn db-ns">
            <ExtensionPoint
              id="logo"
              url={logoUrl}
              title={logoTitle}
              width={logoSize.desktop.width}
              height={logoSize.desktop.height}
              isMobile={false}
            />
          </div>
        )}
      </Link>
    </div>
  )
}

Logo.propTypes = {
  ...logo.propTypes,
}

Logo.defaultProps = {
  ...logo.defaultProps,
}

export default Logo
