import React from 'react'
import PropTypes from 'prop-types'
import { ExtensionPoint } from 'vtex.render-runtime'
import { FormattedMessage } from 'react-intl'
import { ButtonWithIcon } from 'vtex.styleguide'
import { IconSearch } from 'vtex.dreamstore-icons'

import header from '../store-header.css'

const Icons = ({ 
  showSearchIcon,
  leanMode,
  iconClasses,
  showLogin,
  labelClasses,
  onActiveSearch
}) => (
    <div className={`${header.topMenuIcons} flex justify-end flex-grow-1 flex-grow-0-ns items-center order-1-s ml-auto-s order-2-ns`}>
      {/* Mobile icons */}
      <div className="flex dn-ns mr3">
        { showSearchIcon && !leanMode && (
          <div className="pv2 nl5">
              <ButtonWithIcon
                variation="tertiary"
                onClick={onActiveSearch}
              >
                <IconSearch className={iconClasses} />
              </ButtonWithIcon>
            </div>
          )}

          {showLogin && (
            <ExtensionPoint
              id="login"
              iconClasses={iconClasses}
              labelClasses={labelClasses}
            />
          )}

          {!leanMode && <ExtensionPoint
            id="minicart"
            iconClasses={iconClasses}
            labelClasses={labelClasses}
          />}

        </div>

        {/** Desktop icons */}
        <div className="dn flex-ns">
          {showLogin && (
            <ExtensionPoint
              id="login"
              iconClasses={iconClasses}
              labelClasses={labelClasses}
              iconLabel={<FormattedMessage id="header.topMenu.login.icon.label" />}
            />
          )}

          {!leanMode && (
            <ExtensionPoint
              id="minicart"
              iconClasses={iconClasses}
              labelClasses={labelClasses}
              iconLabel={<FormattedMessage id="header.topMenu.minicart.icon.label" />}
            />
          )}
        </div>
    </div> 
)

Icons.propTypes = {
    showSearch: PropTypes.bool,
    showLogin: PropTypes.bool,
    leanMode: PropTypes.bool,
    iconClasses: PropTypes.string,
    labelClasses: PropTypes.string
}

export default Icons