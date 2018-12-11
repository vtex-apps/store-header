import React  from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Adopt } from 'react-adopt'
import { ExtensionPoint } from 'render'

const SearchBar = ({mobileMode, fixed, compactMode, autoFocus}) => {
  const searchBar = (
    <Adopt
      mapper={{
        placeholder: <FormattedMessage id='header.search-placeholder' />,
        emptyPlaceholder: <FormattedMessage id='header.search-emptyPlaceholder' />,
      }}
    >
      {({placeholder, emptyPlaceholder}) => (
        <ExtensionPoint
          id="search-bar"
          placeholder={placeholder}
          emptyPlaceholder={emptyPlaceholder}
          compactMode={compactMode}
          autoFocus={autoFocus}
        />
      )}
    </Adopt>
  )

  return (
    <div className={`vtex-top-menu__search-bar flex pa2-m flex-grow-1 justify-center ${mobileMode ? 'order-2' : 'order-1'}`}>
      <div className="w-100 mw7">
        {mobileMode ? !fixed && searchBar : searchBar}
      </div>
    </div>
  )
}

SearchBar.propTypes = {
  mobileMode: PropTypes.bool,
  fixed: PropTypes.bool,
  compactMode: PropTypes.bool,
  autoFocus: PropTypes.bool,
}

export default SearchBar