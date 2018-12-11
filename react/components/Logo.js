import React from 'react'
import PropTypes from 'prop-types'
import { ExtensionPoint, Link } from 'render'
import ReactResizeDetector from 'react-resize-detector'

const Logo = ({link, src, title, widthMobile, heightMobile, widthDesktop, heightDesktop, onResize}) => (
  <div className="vtex-top-menu__logo pv2">
    <ReactResizeDetector handleHeight onResize={onResize}>
      {() => (
        <Link
          to={link}
          className="outline-0"
          // there is a weird bottom padding being added
          // below the image. This fixes the issue,
          // but the cause should be investigated
          style={{fontSize:0}}
        >
          <div className="db dn-ns">
            <ExtensionPoint
              id="logo"
              url={src}
              title={title}
              width={widthMobile}
              height={heightMobile}
            />
          </div>
          <div className="dn db-ns">
            <ExtensionPoint
              id="logo"
              url={src}
              title={title}
              width={widthDesktop}
              height={heightDesktop}
            />
          </div>
        </Link>
      )}
    </ReactResizeDetector>
  </div>
)

Logo.propTypes = {
  src: PropTypes.string.isRequired,
  link: PropTypes.string,
  title: PropTypes.string,
  onResize: PropTypes.func,
  widthMobile: PropTypes.number,
  heightMobile: PropTypes.number,
  widthDesktop: PropTypes.number,
  heightDesktop: PropTypes.number,
}

Logo.defaultProps = {
  link: '/',
  onResize: () => {},
}

export default Logo
