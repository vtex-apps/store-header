import React, { PureComponent, Fragment } from 'react'
import { bool, string } from 'prop-types'
import { ExtensionPoint, withRuntimeContext } from 'vtex.render-runtime'
import Logo from './Logo'
import SearchBar from './SearchBar'
import Icons from './Icons'
import { CONSTANTS } from './Helpers'

/**
 * Component that deals with content thats always fixed on top.
 * Also handles the toggle between mobile search and mobile navbar.
 * TODO: Change to hooks when it's available at render.
 */
class FixedContent extends PureComponent {

  static propTypes = {
    leanMode: bool,
    logoUrl: string,
    linkUrl: string,
    logoTitle: string,
    showSearchBar: bool,
    showLogin: bool,
    iconClasses: string,
    mobile: bool,
    desktop: bool
  }

  static defaultProps = {
    iconClasses: CONSTANTS.ICON_CLASSES,
  }

  state = {
    mobileSearchActive: false
  }

  render() {
    const {
      leanMode,
      logoUrl,
      linkUrl,
      logoTitle,
      showSearchBar,
      showLogin,
      iconClasses,
      runtime: { hints: { mobile, desktop } }
    } = this.props;

    const { mobileSearchActive } = this.state

    return(
      mobileSearchActive ? (
        mobile && (
          <div className="flex justify-start pa2 relative w-100">
            <SearchBar
              autoFocus
              onCancel={() => this.setState({ mobileSearchActive: false })}
            />
          </div>
        )
      ) : (
        <Fragment>
          { !leanMode && mobile &&
            <ExtensionPoint
              id="category-menu"
              mobileMode
              iconClasses={iconClasses}
            />
          }

          <Logo
            src={logoUrl}
            link={linkUrl}
            title={logoTitle}
          />
  
          { !leanMode && desktop &&
            <div className="dn db-ns flex-grow-1">
              <SearchBar />
            </div>
          }
          
          <Icons
            showSearchIcon={showSearchBar}
            leanMode={leanMode}
            showLogin={showLogin}
            onActiveSearch={() => this.setState({ mobileSearchActive: true })}
          />
        </Fragment>
      )
    )
  }
}

export default withRuntimeContext(FixedContent)