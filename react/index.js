import React from 'react'
import { useChildBlock } from 'vtex.render-runtime' // eslint-disable-line @typescript-eslint/camelcase
import LegacyHeader from './legacy'
import CustomHeader from './components/CustomHeader'

const Header = props => {
  const headerDesktop = !!useChildBlock({
    id: 'header-layout.desktop',
  })
  const headerMobile = !!useChildBlock({
    id: 'header-layout.mobile',
  })

  const hasCustomHeader = headerDesktop || headerMobile

  return hasCustomHeader ? (
    <CustomHeader {...props} />
  ) : (
    <LegacyHeader {...props} />
  )
}

Header.schema = LegacyHeader.schema

export default Header
