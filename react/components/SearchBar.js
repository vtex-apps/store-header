import React from 'react'
import { func, bool, string } from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Adopt } from 'react-adopt'
import { ExtensionPoint, withRuntimeContext } from 'vtex.render-runtime'
import { Button } from 'vtex.styleguide'
import classNames from 'classnames'
import header from '../store-header.css'
import { CONSTANTS } from './Helpers'

const SearchBar = ({
  autoFocus,
  onCancel,
  iconClasses,
  runtime: { hints: { mobile, desktop } } 
}) => {

  const searchBarClassNames = classNames(`${header.topMenuSearchBar} flex pa2-m flex-grow-1`, {
    'justify-between': mobile,
    'justify-center': desktop
  })

  const cancelClassNames = classNames(`${iconClasses} ttl`)

  return (
    <div className={searchBarClassNames}>
      <div className="w-75">
        <Adopt
          mapper={{
            placeholder: <FormattedMessage id='header.search-placeholder' />,
            emptyPlaceholder: <FormattedMessage id='header.search-emptyPlaceholder' />,
          }}
        >
          {({ placeholder, emptyPlaceholder }) => (
            <ExtensionPoint
              id="search-bar"
              placeholder={placeholder}
              emptyPlaceholder={emptyPlaceholder}
              autoFocus={autoFocus}
              hasIconLeft={mobile}
              iconClasses={iconClasses}
            />
          )}
        </Adopt>
      </div>
      { mobile && (
        <div className="w-25 pa2-m pt2-s">
          <Button size="small" variation="tertiary" onClick={onCancel}>
            <span className={cancelClassNames}><FormattedMessage id="header.search-cancel" /></span>
          </Button>
        </div>
      )}
    </div>
  )
}

SearchBar.propTypes = {
  onCancel: func,
  autoFocus: bool,
  iconClasses: string,
  mobile: bool
}

SearchBar.defaultProps = {
  iconClasses: CONSTANTS.ICON.CLASS,
  onCancel: () => { },
}

export default withRuntimeContext(SearchBar)
