import type { PropsWithChildren } from 'react'
import React from 'react'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['headerSpacer'] as const

interface Props {
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function Spacer({ classes }: PropsWithChildren<Props>) {
  const { handles } = useCssHandles(CSS_HANDLES, {
    classes,
  })

  return <div className={`${handles.headerSpacer} flex flex-grow-1`} />
}

export default Spacer
