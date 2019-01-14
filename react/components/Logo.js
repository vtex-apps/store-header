import React from 'react'
import PropTypes from 'prop-types'
import { ExtensionPoint, Link } from 'render'
import ReactResizeDetector from 'react-resize-detector'

import header from '../store-header.css'

const Logo = ({ link, src, title, sizeMobile, sizeDesktop, onResize }) => (
  <div className={`${header.topMenuLogo} pv2`}>
    <ReactResizeDetector handleHeight onResize={onResize}>
      <Link
        to={link}
        // there is a weird bottom padding being added
        // below the image. This fixes the issue,
        // but the cause should be investigated
        className={`outline-0 ${header.logoLink}`}
      >
        {sizeMobile && (
          <div className="db dn-ns">
            <ExtensionPoint
              id="logo"
              url={src}
              title={title}
              width={sizeMobile.width}
              height={sizeMobile.height}
              isMobile={true}
            />
          </div>
        )}
        {sizeDesktop && (
          <div className="dn db-ns">
            <ExtensionPoint
              id="logo"
              url={src}
              title={title}
              width={sizeDesktop.width}
              height={sizeDesktop.height}
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
  sizeMobile: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  sizeDesktop: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
}

Logo.defaultProps = {
  link: '/',
  onResize: () => { },
}

export default Logo
