import type { PropsWithChildren } from 'react'
import React from 'react'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['forceCenter', 'forceCenterInnerContainer'] as const

interface Props {
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

/**
 * @deprecated Use `vtex.sticky-layout` and inline elements instead.
 */
function ForceCenter({ children, classes }: PropsWithChildren<Props>) {
  const { handles } = useCssHandles(CSS_HANDLES, {
    classes,
  })

  return (
    <div
      className={`${handles.forceCenter} absolute left-0 right-0 flex justify-center z-1`}
      style={{ pointerEvents: 'none' }}
    >
      <div
        className={handles.forceCenterInnerContainer}
        style={{ pointerEvents: 'all' }}
      >
        {children}
      </div>
    </div>
  )
}

export default ForceCenter
