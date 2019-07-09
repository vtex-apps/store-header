import React, { FunctionComponent } from 'react'
import { Block, useDevice } from 'vtex.render-runtime'

enum Device {
  mobile = 'mobile',
  desktop = 'desktop',
}

const CustomHeaderLayout = ({ device }: { device: Device }) => {
  switch (device) {
    case Device.mobile:
      return (
        <>
          <Block id="header-layout.mobile" />
          <Block id="unstable--header-layout.mobile" />
        </>
      )
    case Device.desktop:
    default:
      return (
        <>
          <Block id="header-layout.desktop" />
          <Block id="unstable--header-layout.desktop" />
        </>
      )
  }
}

const CustomHeader: FunctionComponent = () => {
  const { isMobile } = useDevice()

  return (
    <CustomHeaderLayout device={isMobile ? Device.mobile : Device.desktop} />
  )
}

export default CustomHeader
