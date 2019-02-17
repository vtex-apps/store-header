import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSpring, animated } from 'react-spring'
import useDevice from '../hooks/useDevice'
import useScrollDirection from '../hooks/useScrollDirection'
import { Border } from './Helpers'

import header from '../store-header.css'

const Collapsible = ({ children, leanMode }) => {
  const { desktop } = useDevice()
  const { scroll, scrollingUp } = useScrollDirection()
  const anchor = scroll < 100
  const props = useSpring({ height: anchor || scrollingUp ? 64 : 0 })

  const collapsibleClassnames = classNames(
    header.topMenuCollapsible,
    'bg-base relative flex'
  )

  return desktop && !leanMode ? (
    <Fragment>
      <animated.div className={collapsibleClassnames} style={props}>
        {children}
      </animated.div>
      <Border />
    </Fragment>
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
