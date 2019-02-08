import React from 'react'

export const CONSTANTS = {
  ICON_CLASSES: 'c-on-base',
  LABEL_CLASSES: 'c-on-base',
  LOGO_WIDTH_MOBILE: 90,
  LOGO_HEIGHT_MOBILE: 40,
  LOGO_WIDTH_DESKTOP: 132,
  LOGO_HEIGHT_DESKTOP: 40,
}

export const Spacer = ({height=0, width=0, index=1}) => (
    <div
      className={`bg-base w-100 z-${index} relative`}
      style={{
        height: height,
        width: width,
      }}
    />
)
  
export const Border = ({ fixed, top }) => (
    <div
      className={`${fixed && 'fixed top-0 left-0 w-100 z-2'} bb bw1 b--muted-4`}
      style={{
        top: top || 'inherit',
        boxSizing: 'content-box',
      }}
    />
)