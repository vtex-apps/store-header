import React from 'react'
import {string, bool, func} from 'prop-types'
import { ExtensionPoint } from 'vtex.render-runtime'
import { FormattedMessage } from 'react-intl'
import { ButtonWithIcon } from 'vtex.styleguide'
import { IconSearch } from 'vtex.dreamstore-icons'
import header from '../store-header.css'
import { CONSTANTS } from './Helpers';

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
        { showSearchIcon && !leanMode &&
          <ButtonWithIcon
            icon={<IconSearch className={iconClasses} />}
            variation="tertiary"
            onClick={onActiveSearch}
          />
        }

        { showLogin && 
          <ExtensionPoint
            id="login"
            iconClasses={iconClasses}
            labelClasses={labelClasses}
          />
        }

        { !leanMode && 
          <ExtensionPoint
            id="minicart"
            iconClasses={iconClasses}
            labelClasses={labelClasses}
          />
        }
      </div>

      {/** Desktop icons */}
      <div className="dn flex-ns">
        { showLogin &&
          <ExtensionPoint
            id="login"
            iconClasses={iconClasses}
            labelClasses={labelClasses}
            iconLabel={<FormattedMessage id="header.topMenu.login.icon.label" />}
          />
        }

        { !leanMode &&
          <ExtensionPoint
            id="minicart"
            iconClasses={iconClasses}
            labelClasses={labelClasses}
            iconLabel={<FormattedMessage id="header.topMenu.minicart.icon.label" />}
          />
        }
      </div>
  </div> 
)

Icons.propTypes = {
    showSearch: bool,
    showLogin: bool,
    leanMode: bool,
    iconClasses: string,
    labelClasses: string,
    onActiveSearch: func,
}

Icons.defaultProps = {
  iconClasses: CONSTANTS.ICON.CLASS,
  labelClasses: CONSTANTS.LABEL.CLASS,
  onActiveSearch: () => {},
}

export default Icons