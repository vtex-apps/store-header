import React from 'react'
import classNames from 'classnames'
import { Container } from 'vtex.store-components'

const Row = ({ children, fullWidth, sticky, inverted }) => {
  const content = (
    <div className="w-100 flex items-center">
      {children}
    </div>
  )

  return (
    <div
      className={classNames('w-100 top-0', inverted ? 'bg-base--inverted c-on-base--inverted' : 'bg-base c-on-base', { 'z-999': sticky })}
      style={{
        // TODO: use `sticky` class once it's available on render
        position: sticky ? 'sticky' : 'relative',
      }}>
      {fullWidth ? content : (
        <Container className="w-100 flex">
          {content}
        </Container>
      )}
    </div>
  )
}

export default Row