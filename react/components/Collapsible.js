import React from 'react'
import PropTypes from 'prop-types'
import { useRuntime } from 'vtex.render-runtime'
import withScrollAnimation from './ScrollAnimation'
import { Border } from './Helpers'

const Collapsible = ({
  children,
  top,
  leanMode,
  animation,
}) => {

  const { hints : { desktop } } = useRuntime()

  return desktop && !leanMode ? (
    <div
      className={`${animation} fixed z-2 w-100 bg-base`}
      style={{
        top: top,
        willChange: 'transform' // Better performance when animating
      }}
    >
      { children }
      <Border />
    </div>
  ):(
    <Border fixed top={top} />
  )
}

Collapsible.propTypes = {
  animation: PropTypes.string.isRequired,
  leanMode: PropTypes.bool,
  top: PropTypes.number,
}

Collapsible.defaultProps = {
  top: 0,
  leanMode: false
}

export  default withScrollAnimation()(Collapsible)