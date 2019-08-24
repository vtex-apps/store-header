import React, { FunctionComponent } from 'react'
import { StickyRows } from 'vtex.sticky-layout'

const Layout: FunctionComponent = ({ children }) => {
  return <StickyRows>{children}</StickyRows>
}

export default Layout
