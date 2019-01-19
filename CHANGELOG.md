# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- Add `header.lean` to `interfaces.json` and update the syntax. 

## [2.5.1] - 2019-01-18
### Changed
- Adjust the way to import render-runtime components.

## [2.5.0] - 2019-01-18
### Changed
- Update React builder to 3.x.
- Bump vtex.styleguide to 9.x.

## [2.4.5] - 2019-01-17
### Fixed
- Adjust alignment of the search button and fix the minicart item counter overlapping.

## [2.4.4] - 2019-01-15
### Changed
- Add `theme` block. 

## [2.4.3] - 2019-01-15
### Fixed
- Hide mobile search when scrollled back to top and replace `Button` component with `ButtonWithIcon` component.

## [2.4.2] - 2019-01-14
### Fixed
- Remove logo inline style css.

## [2.4.1] - 2019-01-09
### Fixed
- Fix header without padding.

## [2.4.0] - 2019-01-09
### Changed
- Bye `pages.json`! Welcome `store-builder`.
- Adapt header to use `Container` and CSS Modules.

## [2.3.1] - 2018-12-27
### Fixed
- Fix horizontal padding on SearchBar.

## [2.3.0] - 2018-12-17
### Added
- Support to messages builder.
- Rebrand the app name to `store-header`.

## [2.2.3] - 2018-12-14

## [2.2.2] - 2018-12-14
### Fixed
- Fix padding vertical of fixed top menu.

## [2.2.1] - 2018-12-13

### Fixed
- Fixed bug where the category menu wouldn't show up on mobile.

## [2.2.0] - 2018-12-13

### Changed
- Layout adjustments on the topbar.
- Header no longer depends on 'OrderFormContext' and no longer has Alert.

### Fixed
- Fixes support for extra headers, such as telemarketing.

## [2.1.5] - 2018-12-06

### Added
- Add `linkUrl` prop to `Header` component that changes the logo link URL.

### Changed
- Updated topbar layout and scroll behavior.

## [2.1.4] - 2018-12-05

### Fixed
- Fixed topbar padding bottom on mobile.

## [2.1.3] - 2018-12-05
### Fixed
- No padding being applied in the `SearchBar` bottom in mobile mode.

### Changed
- Logo sizes on desktop and mobile.

## [2.1.2] - 2018-12-04
### Fixed
- Paddings to match the body.

## [2.1.1] - 2018-12-02

### Changed
- Add max width to the header logo and change some paddings.

## [2.1.0] - 2018-11-27
### Changed
- Paddings and margins to match other components.

## [2.0.0] - 2018-11-08
### Changed
- Replace tachyons colors with design tokens and fix static analysis warnings.

## [1.5.1] - 2018-11-07

### Fixed

- The "fixed" topbar is always being rendered, and its visibility is toggled now instead. This is so its height can be always calculable.

## [1.5.0] - 2018-11-07

### Added
- Hide the `SearchBar` when scroll the page in mobile devices. 
- In the above scenario, a icon is displayed and when clicked the `Searchbar` is rendered.

## [1.4.0] - 2018-11-07

### Added

- Added the classes `vtex-top-menu-fixed` and `vtex-top-menu-static` to each respective stage of the top menu.

## [1.3.3] - 2018-11-06
### Fixed
- Fixes `showSearchBar should be a function` error

## [1.3.2] - 2018-11-06

### Fixed
- Fixed bug where topbar was permanently fixed when scrolling
- Fixed bug where content was jumping around when the header was set to fixed

## [1.3.1] - 2018-11-06

### Fixed
- Better scroll performance

## [1.3.0] - 2018-11-05
### Added
- Configuration to show, searchBar, and login buttons

## [1.2.1] - 2018-10-25

## [1.2.0] - 2018-10-24
### Added 
- Lean mode for Delivery DreamStore

## [1.1.1] - 2018-10-05
### Fixed
- `SearchBar` alignment.

## [1.1.0] - 2018-10-03
### Added
- `Header` schema to display the logo uploaded by the user.
### Removed
- `Header` box-shadow.

## [1.0.1] - 2018-09-20
### Fixed
 - Fix `Header` issues in smaller displays
  
## [1.0.0] - 2018-09-18
### Added
- `Header` component.
