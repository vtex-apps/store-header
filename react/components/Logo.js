import React from 'react'
import { ExtensionPoint, Link } from 'vtex.render-runtime'
import useDevice from '../hooks/useDevice'
import { logo } from '../defaults'

import styles from '../store-header.css'

/**
 * Represents the header logo
 * @param {String} logoUrl - url of the logo src
 * @param {String} logoTitle - alt of the logo
 * @param {String} linkUrl - url that logo should redirect
 * @param {Object} logoSize - sizes of logo on mobile and desktop
 */
const Logo = ({ logoUrl, logoTitle, linkUrl, logoSize }) => {
  const { mobile, desktop } = useDevice()

  return (
    <div className={`${styles.topMenuLogo} pv2 mr5`}>
      <Link to={linkUrl} className={`outline-0 ${styles.logoLink}`}>
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
