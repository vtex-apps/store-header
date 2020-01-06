import React, { Suspense } from 'react'
import { useChildBlock, NoSSR } from 'vtex.render-runtime'

import CustomHeader from './components/CustomHeader'
const LegacyHeader = React.lazy(() => import('./legacy'))

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
    <NoSSR>
      <Suspense fallback={<div />}>
        <LegacyHeader {...props} />
      </Suspense>
    </NoSSR>
  )
}

Header.schema = LegacyHeader.schema

export default Header
