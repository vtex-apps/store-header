import React from 'react'

const Spacer = ({ height, width, index }) => (
  <div
    className={`z-${index} bg-base w-100 relative`}
    style={{
      height: height,
      width: width,
    }}
  />
)

Spacer.defaultProps = {
  height: 0,
  width: 0,
  index: 1,
}

export { Spacer }
