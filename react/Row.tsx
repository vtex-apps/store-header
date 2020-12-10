import type { PropsWithChildren } from 'react'
import React from 'react'
import classNames from 'classnames'
import { Container } from 'vtex.store-components'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { useCssHandles } from 'vtex.css-handles'

import StickyRow from './components/StickyRow'

const CSS_HANDLES = [
  'headerRowContainer',
  'headerRow',
  'headerRowBackground',
  'headerRowContentContainer',
] as const

interface Props {
  /**
   * Define if the row behaves in a sticky manner
   * @default false
   * */
  sticky?: boolean
  zIndex?: number
  /**
   * Define if the element takes the full width of its container
   * @default false
   * */
  fullWidth?: boolean
  /**
   * Define if the row should have inverted background and text colors
   * @default false
   * */
  inverted?: boolean
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

/**
 * @deprecated Use the `vtex.sticky-layout` app instead.
 */
function Row({
  children,
  sticky,
  zIndex,
  fullWidth,
  inverted,
  classes,
}: PropsWithChildren<Props>) {
  const { handles } = useCssHandles(CSS_HANDLES, {
    classes,
  })

  const content = (
    <div className={`${handles.headerRowContainer} w-100 flex items-center`}>
      {children}
    </div>
  )

  return (
    <StickyRow sticky={sticky} zIndex={zIndex}>
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
            content
          ) : (
            <Container
              className={`${handles.headerRowContentContainer} w-100 flex`}
            >
              {content}
            </Container>
          )}
        </div>
      </div>
    </StickyRow>
  )
}

export default Row
