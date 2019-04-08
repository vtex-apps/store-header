import React from 'react'
import { useChildBlock__unstable } from 'vtex.render-runtime' // eslint-disable-line @typescript-eslint/camelcase
import LegacyHeader from './legacy'
import CustomHeader from './components/CustomHeader'

const Header = props => {
  const headerDesktop = !!useChildBlock__unstable({
    id: 'unstable--header-layout.desktop',
  })
  const headerMobile = !!useChildBlock__unstable({
    id: 'unstable--header-layout.mobile',
  })

  const hasCustomHeader = headerDesktop || headerMobile

  return null
  return hasCustomHeader ? (
    <CustomHeader {...props} />
  ) : (
    <LegacyHeader {...props} />
  )
}

Header.schema = {
  title: 'editor.header.title',
  description: 'editor.header.description',
}

export default Header
