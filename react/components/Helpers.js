import React from 'react'

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