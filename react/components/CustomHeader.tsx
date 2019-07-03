import React, { FunctionComponent } from 'react'
import { ExtensionPoint, useRuntime, NoSSR } from 'vtex.render-runtime'
import Media from 'react-media'

enum Device {
  mobile = 'mobile',
  desktop = 'desktop',
}

const CustomHeaderLayout = ({ device }: { device: Device }) => {
  switch (device) {
    case Device.mobile:
      return (
        <>
          <ExtensionPoint id="header-layout.mobile" />
          <ExtensionPoint id="unstable--header-layout.mobile" />
        </>
      )
    case Device.desktop:
    default:
      return (
        <>
          <ExtensionPoint id="header-layout.desktop" />
          <ExtensionPoint id="unstable--header-layout.desktop" />
        </>
      )
  }
}

const CustomHeader: FunctionComponent = () => {
  const {
    hints: { mobile },
  } = useRuntime()

  return (
    <NoSSR
      onSSR={
        <CustomHeaderLayout device={mobile ? Device.mobile : Device.desktop} />
      }
    >
      <Media query="(max-width:40rem)">
        {matches => (
          <CustomHeaderLayout
            device={matches ? Device.mobile : Device.desktop}
          />
        )}
      </Media>
    </NoSSR>
  )
}

export default CustomHeader
