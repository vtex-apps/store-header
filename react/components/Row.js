import React from 'react'
import classNames from 'classnames'
import { Container } from 'vtex.store-components'

const Row = ({
  children,
  fullWidth,
  inverted,
}) => {
  const content = (
    <div className="w-100 flex items-center">
      {children}
    </div>
  )

  return (
    <div className={classNames('w-100', inverted ? 'bg-base--inverted c-on-base--inverted' : 'bg-base c-on-base')}>
      {fullWidth ? content : (
        <Container className="w-100 flex">
          {content}
        </Container>
      )}
    </div>
  )
}

export default Row