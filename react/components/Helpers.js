import React from 'react'

export const Spacer = ({vertical=0, horizontal=0, index=1}) => (
    <div
      className={`bg-base w-100 z-${index} relative`}
      style={{
        height: vertical,
        width: horizontal,
      }}
    />
)
  
export const Border = ({fixed, top}) => (
    <div
      className={`${fixed && 'fixed top-0 left-0 w-100'} bb bw1 b--muted-4`}
      style={{
        top: top || 'inherit',
        boxSizing: 'content-box',
      }}
    />
)