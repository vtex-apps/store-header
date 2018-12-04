import React from 'react'
import PropTypes from 'prop-types'
import { ExtensionPoint, Link } from 'render'
import ReactResizeDetector from 'react-resize-detector'

const Logo = ({link, src, title, maxWidth, maxHeight, onResize}) => (
  <div className="vtex-top-menu__logo">
    <ReactResizeDetector handleHeight onResize={onResize}>
      {() => (
        <Link to={link} className="outline-0">
          <ExtensionPoint
            id="logo"
            url={src}
            title={title}
            width={maxWidth}
            height={maxHeight}
          />
        </Link>
      )}
    </ReactResizeDetector>
  </div>
)

Logo.propTypes = {
  src: PropTypes.string.isRequired,
  link: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  onResize: PropTypes.func,
}

Logo.defaultProps = {
  link: '/',
  onResize: () => {},
}

export default Logo
