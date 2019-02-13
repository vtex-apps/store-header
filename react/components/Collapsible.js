import React from 'react'
import PropTypes from 'prop-types'
import withScrollAnimation from './ScrollAnimation'
import { Border } from './Helpers'
import useDevice from '../hooks/useDevice'

const Collapsible = ({
  children,
  leanMode,
  animation,
  didAnimate,
  onAnimate,
}) => {
  const { desktop } = useDevice()
  onAnimate(didAnimate)

  return desktop && !leanMode ? (
    <div
      className={`${animation} relative bg-base`}
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
