import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Adopt } from 'react-adopt'
import { ExtensionPoint, useRuntime } from 'vtex.render-runtime'
import { Button } from 'vtex.styleguide'
import classNames from 'classnames'
import header from '../store-header.css'
import { CONSTANTS } from './Helpers'

const SearchBar = ({
  autoFocus,
  onCancel,
  iconClasses,
}) => {

  const { hints : { mobile, desktop } } = useRuntime()

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
  onCancel: PropTypes.func,
  autoFocus: PropTypes.bool,
  iconClasses: PropTypes.string 
}

SearchBar.defaultProps = {
  onCancel: () => { },
  autoFocus: false,
  iconClasses: CONSTANTS.ICON.CLASS,
}

export default SearchBar