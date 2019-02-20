import React from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { FormattedMessage } from 'react-intl'
import { ButtonWithIcon } from 'vtex.styleguide'
import { IconSearch } from 'vtex.dreamstore-icons'
import useDevice from '../hooks/useDevice'
import { lean, icons, searchBar, login } from '../defaults'

import styles from '../store-header.css'

/**
 * Represents the header icon buttons
 */
const Actions = ({
  showSearchBar,
  leanMode,
  iconClasses,
  labelClasses,
  showLogin,
  onActiveSearch,
}) => {
  const { mobile, desktop } = useDevice()

  return (
    <div
      className={`${
        styles.topMenuIcons
      } flex justify-end flex-grow-1 flex-grow-0-ns items-center order-1-s ml-auto-s order-2-ns`}
    >
      {mobile && (
        <div className="flex mr3">
          {showSearchBar && !leanMode && (
            <ButtonWithIcon
              icon={
                <span className={iconClasses}>
                  <IconSearch />
                </span>
              }
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

Actions.propTypes = {
  /** Callback function for search active */
  onActiveSearch: PropTypes.func,
  ...lean.propTypes,
  ...login.propTypes,
  ...searchBar.propTypes,
  ...icons.propTypes,
}

Actions.defaultProps = {
  onActiveSearch: () => {},
  ...lean.defaultProps,
  ...login.defaultProps,
  ...searchBar.defaultProps,
  ...icons.defaultProps,
}

export default Actions
