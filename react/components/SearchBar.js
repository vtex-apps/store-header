import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Adopt } from 'react-adopt'
import { ExtensionPoint } from 'vtex.render-runtime'
import { Button } from 'vtex.styleguide'

import header from '../store-header.css'

const SearchBar = ({ isMobile, autoFocus, onCancel }) => (
  <React.Fragment>
    <div className={`${header.topMenuSearchBar} flex pa2-m flex-grow-1 justify-center`}>
      <div className="w-100 mw7">
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
            />
          )}
        </Adopt>
      </div>
    </div>
    {isMobile && (
      <Button size="small" variation="tertiary" onClick={onCancel}>
        <FormattedMessage id="header.search-cancel" />
      </Button>
    )}
  </React.Fragment>
)

SearchBar.propTypes = {
  onCancel: PropTypes.func,
  isMobile: PropTypes.bool,
  autoFocus: PropTypes.bool,
}

SearchBar.defaultProps = {
  onCancel: () => { },
}

export default SearchBar
