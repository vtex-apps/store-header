import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSpring, animated, config as springPresets } from 'react-spring'
import useDevice from '../hooks/useDevice'
import useScrollDirection from '../hooks/useScrollDirection'
import { Border } from './Helpers'

import header from '../store-header.css'

const Collapsible = ({ children, leanMode, animate }) => {
  const { desktop } = useDevice()
  const { scroll, scrollingUp } = useScrollDirection()
  const { onScroll, anchor, always, from, to, preset, config } = animate

  let animationTrigger = true

  if (onScroll) {
    const animateWhen = scroll < anchor
    const elastic = always ? scrollingUp : false
    animationTrigger = animateWhen || elastic
  }

  const props = useSpring({
    config: preset ? springPresets[preset] : config,
    height: animationTrigger ? from : to,
  })

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
  animate: PropTypes.shape({
    onScroll: PropTypes.bool,
    always: PropTypes.bool,
    anchor: PropTypes.number,
    from: PropTypes.number,
    to: PropTypes.number,
    preset: PropTypes.oneOf([
      'default',
      'gentle',
      'wobbly',
      'stiff',
      'slow',
      'molasses',
    ]),
    config: PropTypes.shape({
      mass: PropTypes.number,
      tension: PropTypes.number,
      friction: PropTypes.number,
      clamp: PropTypes.bool,
      precision: PropTypes.number,
      velocity: PropTypes.number,
      duration: PropTypes.number,
      easing: PropTypes.func,
    }),
  }),
}

Collapsible.defaultProps = {
  leanMode: false,
  animate: {
    onScroll: true,
    always: true,
    anchor: 100,
    from: 64,
    to: 0,
    preset: 'default',
    config: {},
  },
}

export default Collapsible
