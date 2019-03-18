import React from 'react'

export const useRuntime = () => {
  let hints = { mobile: false, desktop: true }
  const setHints = h => {
    hints = h
  }
  const page = 'test'
  return { hints, setHints, page }
}

export const ExtensionPoint = ({ id }) => (
  <div className="extension-point-mock">{id}</div>
)

export const Link = ({ children }) => (
  <div className="link-mock">{children}</div>
)

export const NoSSR = ({ children }) => (
  <div className="no-ssr-mock">{children}</div>
)
