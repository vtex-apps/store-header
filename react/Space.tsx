import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['headerSpacer'] as const

function Spacer() {
  const { handles } = useCssHandles(CSS_HANDLES)

  return <div className={`${handles.headerSpacer} flex flex-grow-1`} />
}

export default Spacer
