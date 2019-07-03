import React, { FunctionComponent } from 'react'
import { ExtensionPoint, useRuntime, NoSSR } from 'vtex.render-runtime'
import Media from 'react-media'

const CustomHeader: FunctionComponent = () => {
  const {
    hints: { mobile },
  } = useRuntime()

  return (
    <NoSSR
      onSSR={
        mobile ? (
          <>
            <ExtensionPoint id="header-layout.mobile" />
            <ExtensionPoint id="unstable--header-layout.mobile" />
          </>
        ) : (
          <>
            <ExtensionPoint id="header-layout.desktop" />
            <ExtensionPoint id="unstable--header-layout.desktop" />
          </>
        )
      }
    >
      <Media query="(max-width:40rem)">
        {matches =>
          matches ? (
            <>
              <ExtensionPoint id="header-layout.mobile" />
              <ExtensionPoint id="unstable--header-layout.mobile" />
            </>
          ) : (
            <>
              <ExtensionPoint id="header-layout.desktop" />
              <ExtensionPoint id="unstable--header-layout.desktop" />
            </>
          )
        }
      </Media>
    </NoSSR>
  )
}

export default CustomHeader
