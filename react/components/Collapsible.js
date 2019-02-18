import React, { Fragment } from 'react'
import classNames from 'classnames'
import { useSpring, animated, config as springPresets } from 'react-spring'
import useDevice from '../hooks/useDevice'
import useScrollDirection from '../hooks/useScrollDirection'
import { Border } from './Helpers'
import { collapsible, lean } from '../defaults'

import header from '../store-header.css'

const Collapsible = ({ children, leanMode, collapsibleAnimation }) => {
  const { desktop } = useDevice()
  const { scroll, scrollingUp } = useScrollDirection()
  const {
    onScroll,
    anchor,
    always,
    from,
    to,
    preset,
    config,
  } = collapsibleAnimation

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
  ...lean.propTypes,
  ...collapsible.propTypes,
}

Collapsible.defaultProps = {
  ...lean.defaultProps,
  ...collapsible.defaultProps,
}

export default Collapsible
