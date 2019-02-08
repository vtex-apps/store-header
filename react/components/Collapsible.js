import React from 'react'
import { number } from 'prop-types'
import { withRuntimeContext } from 'vtex.render-runtime'
import { Border } from './Helpers';

const Collapsible = ({
  children,
  top,
  leanMode,
  tbreak,
  runtime: { hints: desktop } 
}) => (
  desktop && !leanMode ? (
    <div
      className={`fixed z-2 w-100 bg-base justify-center animated faster ${ tbreak ? 'slideOutUp' : 'slideInDown' }`}
      style={{ top: top }}
    >
      { children }
      <Border />
    </div>
  ):(
    <Border fixed top={top} />
  )
)

Collapsible.defaultProps = {
    top: 0
}

Collapsible.propTypes = {
    top: number
}

export  default withRuntimeContext(Collapsible)