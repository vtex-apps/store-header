import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Adopt } from 'react-adopt'
import { ExtensionPoint, withRuntimeContext } from 'vtex.render-runtime'
import { Button } from 'vtex.styleguide'

import header from '../store-header.css'

const SearchBar = ({
  autoFocus,
  onCancel,
  mobile,
  iconClasses,
  runtime, 
}) => (
  <div className={`${header.topMenuSearchBar} flex pa2-m flex-grow-1 justify-${ runtime.hints.mobile ? 'between' : 'center' }`}>
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
            hasIconLeft={runtime.hints.mobile}
            iconClasses={iconClasses}
          />
        )}
      </Adopt>
    </div>
    { runtime.hints.mobile && (
      <div className="w-25 pa2-m pt2-s">
        <Button size="small" variation="tertiary" onClick={onCancel}>
          <span className='near-black ttl'><FormattedMessage id="header.search-cancel" /></span>
        </Button>
      </div>
    )}
  </div>
)

SearchBar.propTypes = {
  onCancel: PropTypes.func,
  isMobile: PropTypes.bool,
  autoFocus: PropTypes.bool,
  height: PropTypes.number,
  iconClasses: PropTypes.string
}


SearchBar.defaultProps = {
  onCancel: () => { },
}

export default withRuntimeContext(SearchBar)
