import React from 'react'
import { useChildBlock } from 'vtex.render-runtime'
import LegacyHeader from './legacy'
import CustomHeader from './components/CustomHeader'

const Header = props => {
  const hasHeaderDesktop = !!useChildBlock({
    id: 'header-layout.desktop',
  })
  const hasUnstableHeaderDesktop = !!useChildBlock({
    id: 'unstable--header-layout.desktop',
  })
  const hasHeaderMobile = !!useChildBlock({
    id: 'header-layout.mobile',
  })
  const hasUnstableHeaderMobile = !!useChildBlock({
    id: 'unstable--header-layout.mobile',
  })

  const hasCustomHeader =
    hasHeaderDesktop ||
    hasHeaderMobile ||
    hasUnstableHeaderDesktop ||
    hasUnstableHeaderMobile

  return hasCustomHeader ? (
    <CustomHeader {...props} />
  ) : (
    <LegacyHeader {...props} />
  )
}

Header.schema = LegacyHeader.schema

export default Header
