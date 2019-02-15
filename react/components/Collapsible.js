import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import withScrollAnimation from './ScrollAnimation'
import { Border } from './Helpers'
import useDevice from '../hooks/useDevice'

import header from '../store-header.css'

const Collapsible = ({
  children,
  leanMode,
  animation,
  didAnimate,
  onAnimate,
}) => {
  const { desktop } = useDevice()
  onAnimate(didAnimate)

  const collapsibleClassnames = classNames(
    animation,
    header.topMenuCollapsible,
    'relative bg-base'
  )

  return desktop && !leanMode ? (
    <div
      className={collapsibleClassnames}
      style={{
        zIndex: -1, // Animate under fixed content
        willChange: 'transform', // Better performance when animating
      }}
    >
      {children}
      <Border />
    </div>
  ) : (
    <Border />
  )
}

Collapsible.propTypes = {
  animation: PropTypes.string.isRequired,
  leanMode: PropTypes.bool,
}

Collapsible.defaultProps = {
  leanMode: false,
}

export default withScrollAnimation()(Collapsible)
