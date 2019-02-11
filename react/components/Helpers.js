import React from 'react'
import classNames from 'classnames'

export const CONSTANTS = {
  ICON: {
    CLASS: 'c-on-base',
    ANIMATION: 'animated faster zoomIn'
  },
  LABEL: {
    CLASS: 'c-on-base',
    ANIMATION: 'animated faster fadeIn'
  },
  LOGO: {
    MOBILE: {
      WIDTH: 90,
      HEIGHT: 40
    },
    DESKTOP: {
      WIDTH: 132,
      HEIGHT: 40
    }
  },
  SCROLL_ANIMATION: {
    ANCHOR: 100,
    REVERSE: false,
    SPEED: 'faster',
    ON_SCROLL_DOWN: 'slideOutUp',
    ON_SCROLL_UP: 'slideInDown'
  },
  SPACER: {
    MOBILE: 96,
    DESKTOP: 160
  },
  COLLAPSIBLE: {
    TOP: 96
  }
}

export const Spacer = ({ height=0, width=0, index=1 }) => (
  <div
    className={`z-${index} bg-base w-100 relative`}
    style={{
      height: height,
      width: width,
    }}
  />
)
  
export const Border = ({ fixed, top }) => {
  
  const borderClassNames = classNames(`bb bw1 b--muted-4 `, {
    'fixed top-0 left-0 w-100 z-2' : fixed
  })

  return (
    <div
      className={borderClassNames}
      style={{
        top: top || 'inherit',
        boxSizing: 'content-box',
      }}
    />
  )
}