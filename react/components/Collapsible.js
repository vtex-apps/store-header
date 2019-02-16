import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSpring, animated } from 'react-spring'
import useDevice from '../hooks/useDevice'
import useScrollTracker from '../hooks/useScrollTracker'
import { Border } from './Helpers'

import header from '../store-header.css'

const Collapsible = ({ children, leanMode }) => {
  const { desktop } = useDevice()
  const { scroll } = useScrollTracker()
  const props = useSpring({ height: scroll <= 100 ? 64 : 0 })

  const collapsibleClassnames = classNames(
    header.topMenuCollapsible,
    'bg-base relative'
  )

  return desktop && !leanMode ? (
    <animated.div
      className={collapsibleClassnames}
      style={{ ...props, display: 'grid' }}
    >
      {children}
      <Border />
    </animated.div>
  ) : (
    <Border />
  )
}

Collapsible.propTypes = {
  leanMode: PropTypes.bool,
}

Collapsible.defaultProps = {
  leanMode: false,
}

export default Collapsible
