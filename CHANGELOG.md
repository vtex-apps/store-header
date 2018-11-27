# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
