import React, { FunctionComponent } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import StickyRow from './StickyRow'

interface Props {
  sticky: boolean
}

const CSS_HANDLES = ['headerBorder'] as const

const Border: FunctionComponent<Props> = ({ sticky }) => {
  const handles = useCssHandles(CSS_HANDLES)
  const border = <div className={`${handles.headerBorder} bb b--muted-3`} />

  if (sticky) {
    return <StickyRow>{border}</StickyRow>
  }

  return border
}

export default Border
