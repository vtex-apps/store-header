import React from 'react'
import { useChildBlock__unstable } from 'vtex.render-runtime'
import LegacyHeader from './legacy'
import CustomHeader from './CustomHeader'

const Header = props => {
  const headerDesktop = useChildBlock__unstable({ id: 'header-desktop' })
  const headerMobile = useChildBlock__unstable({ id: 'header-mobile' })

  const hasCustomHeader = headerDesktop || headerMobile

  console.log({
    headerDesktop, headerMobile, hasCustomHeader
  })

  return (
    hasCustomHeader 
      ? <CustomHeader {...props} />
      : <LegacyHeader {...props} />
  )
}

export default Header