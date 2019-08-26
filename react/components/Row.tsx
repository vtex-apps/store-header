import React, { FunctionComponent } from 'react'
import classNames from 'classnames'
import { Container } from 'vtex.store-components'
import StickyRow from './StickyRow'
import { generateBlockClass, BlockClass } from '@vtex/css-handles'

import styles from './Row.css'

interface Props {
  sticky?: boolean
  zIndex?: number
  fullWidth?: boolean
  inverted?: boolean
}

const Row: FunctionComponent<Props & BlockClass> = ({
  children,
  sticky,
  zIndex,
  fullWidth,
  inverted,
  blockClass,
}) => {
  const content = (
    <div className={`${styles.headerRowContainer} w-100 flex items-center`}>
      {children}
    </div>
  )

  return (
    <StickyRow sticky={sticky} zIndex={zIndex}>
      <div className={generateBlockClass(styles.headerRow, blockClass)}>
        <div
          className={classNames(
            `${generateBlockClass(
              styles.headerRowBackground,
              blockClass
            )} w-100`,
            inverted
              ? 'bg-base--inverted c-on-base--inverted'
              : 'bg-base c-on-base'
          )}
        >
          {fullWidth ? (
            content
          ) : (
            <Container className="w-100 flex">{content}</Container>
          )}
        </div>
      </div>
    </StickyRow>
  )
}

export default Row
