import React from 'react'
import { Container } from 'vtex.store-components'

const Row = ({ children, fullWidth, sticky }) => {
  const content = (
    <div className="w-100 flex items-center">
      {children}
    </div>
  )

  return (
    <div
      className={`w-100 bg-base top-0 ${sticky ? 'z-999' : '' }`}
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