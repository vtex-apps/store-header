import React from 'react'
import { spacer } from '../../defaults'
import useDevice from '../../hooks/useDevice'

/**
 * Spacer necessary to content due fixed Header
 */
const Spacer = ({ spacerHeightDesktop, spacerHeightMobile, spacerWidth }) => {
  const { desktop } = useDevice()

  return (
    <div
      className="z-1 bg-base w-100 relative"
      style={{
        height: desktop ? spacerHeightDesktop : spacerHeightMobile,
        width: spacerWidth,
      }}
    />
  )
}

Spacer.propTypes = {
  ...spacer.propTypes,
}

Spacer.defaultProps = {
  ...spacer.defaultProps,
}

export default Spacer
