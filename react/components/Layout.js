import React from 'react'
import StickyRows from './StickyRows'

const Layout = ({ children }) => {
  return (
    <StickyRows
      isSticky={child => child.props.sticky}>
      {children}
    </StickyRows>
  )
}

export default Layout
