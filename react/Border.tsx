import type { PropsWithChildren } from 'react'
import React from 'react'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { useCssHandles } from 'vtex.css-handles'

import StickyRow from './components/StickyRow'

const CSS_HANDLES = ['headerBorder'] as const

interface Props {
  sticky: boolean
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function Border({ sticky, classes }: PropsWithChildren<Props>) {
  const { handles } = useCssHandles(CSS_HANDLES, {
    classes,
  })

  return (
    <StickyRow sticky={sticky}>
      <div className={`${handles.headerBorder} bb b--muted-3`} />
    </StickyRow>
  )
}

export default Border
