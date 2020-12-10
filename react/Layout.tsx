import type { FunctionComponent } from 'react'
import React from 'react'

import StickyRows from './components/StickyRows'

const Layout: FunctionComponent = ({ children }) => {
  return <StickyRows>{children}</StickyRows>
}

export default Layout
