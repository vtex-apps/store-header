import React from 'react'
import { spacer } from '../../defaults'
import useDevice from '../../hooks/useDevice'

/**
 * Spacer necessary to content due fixed Header
 * @param {Number} spacerHeightDesktop - height on desktop
 * @param {Number} spacerHeightMobile - height on mobile
 * @param {Number} spacerWidth - width on both mobile and desktop
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

export { Spacer }
