import React from 'react'
import PropTypes from 'prop-types'
import { ExtensionPoint, Link, withRuntimeContext } from 'vtex.render-runtime'
import ReactResizeDetector from 'react-resize-detector'
import { CONSTANTS } from './Helpers'

import header from '../store-header.css'

const Logo = ({
  link,
  src,
  title,
  onResize,
  runtime: { hints: mobile, desktop }
}) => (
  <div className={`${header.topMenuLogo} pv2 mr5`}>
    <ReactResizeDetector handleHeight onResize={onResize}>
      <Link
        to={link}
        // there is a weird bottom padding being added
        // below the image. This fixes the issue,
        // but the cause should be investigated
        className={`outline-0 ${header.logoLink}`}
      >
        { mobile && (
          <div className="db dn-ns">
            <ExtensionPoint
              id="logo"
              url={src}
              title={title}
              width={CONSTANTS.LOGO_WIDTH_MOBILE}
              height={CONSTANTS.LOGO_HEIGHT_MOBILE}
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
              width={CONSTANTS.LOGO_WIDTH_DESKTOP}
              height={CONSTANTS.LOGO_HEIGHT_DESKTOP}
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

export default withRuntimeContext(Logo)
