import React, { FunctionComponent } from 'react'
import classNames from 'classnames'
import { Container } from 'vtex.store-components'
import StickyRow from './StickyRow'

interface Props {
  sticky?: boolean
  fullWidth?: boolean
  inverted?: boolean
}

const Row: FunctionComponent<Props> = ({
  children,
  sticky,
  fullWidth,
  inverted,
}) => {
  const content = <div className="w-100 flex items-center">{children}</div>

  return (
    <StickyRow sticky={sticky}>
      <div
        className={classNames(
          'w-100',
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
    </StickyRow>
  )
}

export default Row
