import React from 'react'
import { ExtensionPoint, useRuntime } from 'vtex.render-runtime'
import Media from 'react-media'

const CustomHeader = () => {
  const { hints: { mobile } } = useRuntime()

  if (!window || !window.matchMedia) {
    return mobile ? (
      <ExtensionPoint id="header-mobile" />
    ) : (
      <ExtensionPoint id="header-desktop" />
    )
  }

  return (
    <React.Fragment>
      <Media query="(max-width:40rem)">
        {matches => matches ? (
          <ExtensionPoint id="header-mobile" />
        ) : (
          <ExtensionPoint id="header-desktop" />
        )}
      </Media>
    </React.Fragment>
  )
}

export default CustomHeader
