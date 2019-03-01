import React, { useState } from 'react'

export const useRuntime = () => {
  const [hints, setHints] = useState({ mobile: false, desktop: true })
  return { hints }
}

export const ExtensionPoint = () => (
  <div className="extension-point-mock">Extension point</div>
)

export const Link = ({ children }) => (
  <div className="link-mock">{children}</div>
)

export const NoSSR = ({ children }) => (
  <div className="no-ssr-mock">{children}</div>
)
