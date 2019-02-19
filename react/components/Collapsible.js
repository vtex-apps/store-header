import React from 'react'
import classNames from 'classnames'
import { NoSSR } from 'vtex.render-runtime'
import { useSpring, animated, config as springPresets } from 'react-spring'
import useDevice from '../hooks/useDevice'
import useScrollDirection from '../hooks/useScrollDirection'
import Border from './Helpers/Border'
import { collapsible, lean } from '../defaults'

import styles from '../store-header.css'

/**
 * Represents a collapsible part of the header
 */
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

  const animationStyle =
    !!window.requestAnimationFrame && // Fix SSR Issues
    useSpring({
      config: preset ? springPresets[preset] : config,
      transform: animationTrigger
        ? `translate3d(0, ${to}rem, 0)`
        : `translate3d(0, ${-from}rem, 0)`,
    })

  const collapsibleClassnames = classNames(
    styles.topMenuCollapsible,
    'bg-base flex justify-center relative bb bw1 b--muted-4'
  )

  const fallback = <div className={collapsibleClassnames}>{children}</div>

  return desktop && !leanMode ? (
    <NoSSR onSSR={fallback}>
      <animated.div
        className={collapsibleClassnames}
        style={{ ...animationStyle, zIndex: -1 }}
      >
        {children}
      </animated.div>
    </NoSSR>
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
