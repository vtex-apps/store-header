import React from 'react'
import PropTypes from 'prop-types'
import { ExtensionPoint, Link } from 'vtex.render-runtime'
import ReactResizeDetector from 'react-resize-detector'

import header from '../store-header.css'

const SIZE_MOBILE = {
  width: 90,
  height: 40,
}

const SIZE_DESKTOP = {
  width: 132,
  height: 40,
}

const Logo = ({ link, src, title, mobile, onResize }) => (
  <div className={`${header.topMenuLogo} pv2 mr5`}>
    <ReactResizeDetector handleHeight onResize={onResize}>
      <Link
        to={link}
        // there is a weird bottom padding being added
        // below the image. This fixes the issue,
        // but the cause should be investigated
        className={`outline-0 ${header.logoLink}`}
      >
        {mobile && (
          <div className="db dn-ns">
            <ExtensionPoint
              id="logo"
              url={src}
              title={title}
              width={SIZE_MOBILE.width}
              height={SIZE_MOBILE.height}
              isMobile={true}
            />
          </div>
        )}

        {!mobile && (
          <div className="dn db-ns">
            <ExtensionPoint
              id="logo"
              url={src}
              title={title}
              width={SIZE_DESKTOP.width}
              height={SIZE_DESKTOP.height}
              isMobile={false}
            />
          </div>
        )}
      </Link>
    </ReactResizeDetector>
  </div>
)

Logo.propTypes = {
  src: PropTypes.string.isRequired,
  link: PropTypes.string,
  title: PropTypes.string,
  onResize: PropTypes.func,
  mobile: PropTypes.bool
}

Logo.defaultProps = {
  link: '/',
  onResize: () => { },
}

export default Logo
