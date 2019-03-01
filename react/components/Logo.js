import React from 'react'
import { ExtensionPoint, Link } from 'vtex.render-runtime'
import PropTypes from 'prop-types'
import { logo } from '../defaults'

import styles from '../store-header.css'

/**
 * Represents the header logo
 */
const Logo = ({ logoUrl, logoTitle, linkUrl, logoSize, mobile }) => {
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

        {!mobile && (
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
  /** If it's mobile mode */
  mobile: PropTypes.bool.isRequired,
  ...logo.propTypes,
}

Logo.defaultProps = {
  ...logo.defaultProps,
}

export default Logo
