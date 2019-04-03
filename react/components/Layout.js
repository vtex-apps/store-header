import React from 'react'
import StickyRows  from './StickyRows'

const Layout = ({ children }) => {
  return (
    <StickyRows>
      {children}
    </StickyRows>
  )
}

export default Layout
