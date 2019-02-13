import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { ExtensionPoint } from 'vtex.render-runtime'
import Collapsible from './Collapsible'
import FixedContent from './FixedContent'
import { Border } from './Helpers'

const TopMenu = ({
  extraHeaders,
  leanMode,
  logoUrl,
  linkUrl,
  logoTitle,
  showLogin,
  showSearchBar,
}) => (
  <Fragment>
    {extraHeaders}

    <FixedContent
      leanMode={leanMode}
      logoUrl={logoUrl}
      linkUrl={linkUrl}
      logoTitle={logoTitle}
      showSearchBar={showSearchBar}
      showLogin={showLogin}
    />

    <Collapsible leanMode={leanMode}>
      <ExtensionPoint id="category-menu" />
    </Collapsible>
  </Fragment>
)

TopMenu.propTypes = {
  extraHeaders: PropTypes.element,
  linkUrl: PropTypes.string,
  logoUrl: PropTypes.string,
  logoTitle: PropTypes.string,
  showSearchBar: PropTypes.bool,
  showLogin: PropTypes.bool,
  leanMode: PropTypes.bool,
}

TopMenu.defaultProps = {
  linkUrl: '',
  logoUrl: '',
  logoTitle: '',
  showSearchBar: true,
  showLogin: true,
  leanMode: false,
}

export default TopMenu
