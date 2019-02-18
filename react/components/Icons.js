import React from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { FormattedMessage } from 'react-intl'
import { ButtonWithIcon } from 'vtex.styleguide'
import { IconSearch } from 'vtex.dreamstore-icons'
import useDevice from '../hooks/useDevice'
import { lean, icons } from '../defaults'

import header from '../store-header.css'

const Icons = ({
  showSearchIcon,
  leanMode,
  iconClasses,
  showLogin,
  labelClasses,
  onActiveSearch,
}) => {
  const { mobile, desktop } = useDevice()

  return (
    <div
      className={`${
        header.topMenuIcons
      } flex justify-end flex-grow-1 flex-grow-0-ns items-center order-1-s ml-auto-s order-2-ns`}
    >
      {mobile && (
        <div className="flex mr3">
          {showSearchIcon && !leanMode && (
            <ButtonWithIcon
              icon={<IconSearch className={iconClasses} />}
              variation="tertiary"
              onClick={onActiveSearch}
            />
          )}

          {showLogin && (
            <ExtensionPoint
              id="login"
              iconClasses={iconClasses}
              labelClasses={labelClasses}
            />
          )}

          {!leanMode && (
            <ExtensionPoint
              id="minicart"
              iconClasses={iconClasses}
              labelClasses={labelClasses}
            />
          )}
        </div>
      )}

      {desktop && (
        <div className="flex">
          {showLogin && (
            <ExtensionPoint
              id="login"
              iconClasses={iconClasses}
              labelClasses={labelClasses}
              iconLabel={
                <FormattedMessage id="header.topMenu.login.icon.label" />
              }
            />
          )}

          {!leanMode && (
            <ExtensionPoint
              id="minicart"
              iconClasses={iconClasses}
              labelClasses={labelClasses}
              iconLabel={
                <FormattedMessage id="header.topMenu.minicart.icon.label" />
              }
            />
          )}
        </div>
      )}
    </div>
  )
}

Icons.propTypes = {
  ...lean.propTypes,
  ...icons.propTypes,
}

Icons.defaultProps = {
  ...lean.defaultProps,
  ...icons.defaultProps,
}

export default Icons
