import React from 'react'

const Border = ({ fixed }) => {
  return (
    <div
      className="bb bw1 b--muted-4"
      style={{
        top: 'inherit',
        boxSizing: 'content-box',
      }}
    />
  )
}

export { Border }
