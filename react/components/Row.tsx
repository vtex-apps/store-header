import React, { FunctionComponent } from 'react'
import classNames from 'classnames'
import { Container } from 'vtex.store-components'
import { useCssHandles } from 'vtex.css-handles'

import StickyRow from './StickyRow'

interface Props {
  sticky?: boolean
  zIndex?: number
  fullWidth?: boolean
  inverted?: boolean
}

const CSS_HANDLES = [
  'headerRowContainer',
  'headerRow',
  'headerRowBackground',
  'headerRowContentContainer',
] as const

const Row: FunctionComponent<Props> = ({
  children,
  sticky,
  zIndex,
  fullWidth,
  inverted,
}) => {
  const handles = useCssHandles(CSS_HANDLES)

  const rowContent = (
    <div className={`${handles.headerRowContainer} w-100 flex items-center`}>
      {children}
    </div>
  )

  const row = (
    <div className={handles.headerRow}>
      <div
        className={classNames(
          `${handles.headerRowBackground} w-100`,
          inverted
            ? 'bg-base--inverted c-on-base--inverted'
            : 'bg-base c-on-base'
        )}
      >
        {fullWidth ? (
          rowContent
        ) : (
          <Container
            className={`${handles.headerRowContentContainer} w-100 flex`}
          >
            {rowContent}
          </Container>
        )}
      </div>
    </div>
  )

  if (sticky) {
    return <StickyRow zIndex={zIndex}>{row}</StickyRow>
  }

  return row
}

export default Row
