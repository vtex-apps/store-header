import React from 'react'
import { number, string, bool } from 'prop-types'
import { withRuntimeContext } from 'vtex.render-runtime'
import withScrollAnimation from './ScrollAnimation'
import { Border } from './Helpers'
import { compose } from 'ramda'

const Collapsible = ({
  children,
  top,
  leanMode,
  animation,
  runtime: { hints: desktop } 
}) => (
  desktop && !leanMode ? (
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
)

Collapsible.defaultProps = {
  top: 0,
}

Collapsible.propTypes = {
  /** Distance from top */
  top: number,
  /** Combination of animation classes */
  animation: string,
  /** If is leanMode */
  leanMode: bool,
  /** If is desktop version */
  desktop: bool
}

export  default compose(
  withRuntimeContext,
  withScrollAnimation()
)(Collapsible)