import type { FunctionComponent } from 'react'
import React from 'react'
import { Block } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'

const enum Device {
  mobile = 'mobile',
  desktop = 'desktop',
}

const CustomHeaderLayout = React.memo(({ device }: { device: Device }) => {
  switch (device) {
    case Device.mobile:
      return (
        <>
          <Block id="header-layout.mobile" />
          <Block id="unstable--header-layout.mobile" />
        </>
      )

    case Device.desktop:
    // falls through

    default:
      return (
        <>
          <Block id="header-layout.desktop" />
          <Block id="unstable--header-layout.desktop" />
        </>
      )
  }
})

CustomHeaderLayout.displayName = 'CustomHeaderLayout'

const CustomHeader: FunctionComponent = () => {
  const { isMobile } = useDevice()

  return (
    <CustomHeaderLayout device={isMobile ? Device.mobile : Device.desktop} />
  )
}

export default CustomHeader
