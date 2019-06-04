import React from 'react'

const ForceCenter = ({ children }) => (
  <div
    className="absolute left-0 right-0 flex justify-center z-1"
    style={{ pointerEvents: 'none' }}
  >
    <div style={{ pointerEvents: 'all' }}>{children}</div>
  </div>
)

export default ForceCenter
