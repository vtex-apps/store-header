import type { PropsWithChildren } from 'react'
import React from 'react'

import StickyRows from './components/StickyRows'

// eslint-disable-next-line @typescript-eslint/ban-types
function Layout({ children }: PropsWithChildren<{}>) {
  return <StickyRows>{children}</StickyRows>
}

export default Layout
