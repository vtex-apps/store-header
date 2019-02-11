import React from 'react'
import { string, bool, shape } from 'prop-types'
import { ExtensionPoint, Link, withRuntimeContext } from 'vtex.render-runtime'
import { CONSTANTS } from './Helpers'

import header from '../store-header.css'

const Logo = ({
  link,
  src,
  title,
  size,
  runtime: { hints: { mobile, desktop } }
}) => (
  <div className={`${header.topMenuLogo} pv2 mr5`}>
    <Link
      to={link}
      className={`outline-0 ${header.logoLink}`}
    >
      { mobile && (
        <div className="db dn-ns">
          <ExtensionPoint
            id="logo"
            url={src}
            title={title}
            width={size.mobile.width}
            height={size.mobile.height}
            isMobile={true}
          />
        </div>
      )}

      { desktop && (
        <div className="dn db-ns">
          <ExtensionPoint
            id="logo"
            url={src}
            title={title}
            width={size.desktop.width}
            height={size.desktop.height}
            isMobile={false}
          />
        </div>
      )}
    </Link>
  </div>
)

Logo.propTypes = {
  src: string.isRequired,
  link: string,
  title: string,
  mobile: bool,
  desktop: bool,
  size: shape({
    desktop: shape({
      width: string,
      height: string
    }),
    mobile: shape({
      width: string,
      height: string
    })
  })
}

Logo.defaultProps = {
  link: '/',
  size: {
    desktop: {
      width: CONSTANTS.LOGO.DESKTOP.WIDTH,
      height: CONSTANTS.LOGO.DESKTOP.HEIGHT
    },
    mobile: {
      width: CONSTANTS.LOGO.MOBILE.WIDTH,
      height: CONSTANTS.LOGO.MOBILE.HEIGHT 
    }
  }
}

export default withRuntimeContext(Logo)
