import React from 'react'
import { useChildBlock__unstable } from 'vtex.render-runtime'
import LegacyHeader from './legacy'
import CustomHeader from './components/CustomHeader'

const Header = props => {
  const headerDesktop = !!useChildBlock__unstable({ id: 'unstable--header-layout.desktop' })
  const headerMobile = !!useChildBlock__unstable({ id: 'unstable--header-layout.mobile' })

  const hasCustomHeader = headerDesktop || headerMobile

  return (
    hasCustomHeader 
      ? <CustomHeader {...props} />
      : <LegacyHeader {...props} />
  )
}

export default Header