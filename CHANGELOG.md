# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Update GitHub actions/cache to v4

## [2.29.0] - 2022-12-23

### Added
- Indonesian and Thai translations.

## [2.28.0] - 2022-03-08

### Added
- Norwegian and Norwegian variant translations.

## [2.27.0] - 2021-09-29

### Added
- I18n Ar.

## [2.26.0] - 2021-04-22

### Added
- I18n Da, Fi, Ja, Ko and Ro.

### Changed
- Crowdin configuration file.

## [2.25.7] - 2020-12-14

### Changed
- Deprecate usage of `Row`. `Spacer`, `Layout`, `Border` and `ForceCenter`.
- Use `vtex.css-handles@1.x`.

## [2.25.6] - 2020-09-10
### Fixed
- Improve docs instructions.

## [2.25.5] - 2020-04-06
### Security
- Upgrade packages due to a few security vulnerabilities.

## [2.25.4] - 2020-03-17

### Added

- `header-force-center` is now documented.

## [2.25.3] - 2020-02-12

## [2.25.2] - 2020-01-31
### Changed
- Add `device` varibale in interfaces of blocks that are desktop or mobile exclusive.

## [2.25.1] - 2020-01-24
### Fixed
- Sort numbers by value instead of alphabetically.

## [2.25.0] - 2020-01-06
### Changed
- Lazy loads legacy header.

## [2.24.0] - 2019-12-17
### Added
- `sandbox` to allowed list for `header` and `header-row`.

## [2.23.0] - 2019-12-06
### Added
- New `minicart-base-content` interface to the allowed list in both header and header-row.

## [2.22.3] - 2019-12-02
### Changed
- Default blocks implementation for `header.full`.

## [2.22.2] - 2019-11-08

## [2.22.1] - 2019-11-01
### Fixed
- Builder crashing because it doesn't find the `graphql` type.

## [2.22.0] - 2019-10-16
### Added
- New `forceCenterInnerContainer`, `headerBorder`, `headerRowContentContainer`, `headerSpacer`, `headerStickyRow` CSS handles.

## [2.21.7] - 2019-09-06
### Fixed
- Fix iOS issue where `sticky` would not work.

## [2.21.6] - 2019-09-04
### Changed
- Prevent re-render if the SSR guess regarding screen size was right.

## [2.21.5] - 2019-08-30

## [2.21.4] - 2019-08-29

## [2.21.3] - 2019-08-28

## [2.21.2] - 2019-07-16
### Changed
- Use `useDevice` hook for device detection.

## [2.21.1] - 2019-07-03
### Fixed
- Issue where the hydration would break under certain circumstances (namely, when the user agent would be that of a mobile device but the screen size would be considered a desktop).

## [2.21.0] - 2019-06-28
### Added
- Prop `zIndex` to `header-row`.

## [2.20.2] - 2019-06-27

### Fixed
- Build assets with new builder hub.

## [2.20.1] - 2019-06-07
### Fixed
- Fixed issue that causes syntax error on IE11, due to the use of ES6 features.

## [2.20.0] - 2019-06-04
### Added
- `header-force-center` block, for forcing centering on header.

## [2.19.0] - 2019-05-28
### Added
- Support for `localeSwitcher`.

## [2.18.0] - 2019-05-25

## [2.17.0] - 2019-04-29
### Added
- Added CSS Override class to header row background.

### Added
- Allow `drawer` block on `header-row`.

## [2.16.0] - 2019-04-24
### Changed
- Scope messages by domain

## [2.15.0] - 2019-04-24
### Added
- Adds support for `notification` on `header-row`.

## [2.14.0] - 2019-04-11
### Added
- Adds support for `rich-text` on `header-row`s.

## [2.13.0] - 2019-04-11
### Added
- Add CSS handles and `blockClass` support for rows.

### Changed
- Removed `unstable` flags.
- Renamed `_` to `header-spacer`.
- Decreased `z-index` of rows.

### Deprecated
- Deprecated all `unstable` flags, which will be removed soon.
- Deprecated `_` in favor of `header-spacer`, and will be removed soon.

## [2.12.2] - 2019-04-11
### Fixed
- Fixed bug where the width of the FixedContent part of the Legacy header would be limited by the Container's width.

## [2.12.1] - 2019-04-10

### Fixed
- Legacy Header schema

## [2.12.0] - 2019-04-05

### Added
- Better support for the `sticky` prop. Now it allows multiple and interspected sticky rows.

## [2.11.0] - 2019-03-28

### Added
- Added new experimental `header-layout` blocks, under an `unstable--` flag.
- Support for new experimental `menu` block, under an `unstable--` flag.

### Changed
- All previously required blocks are now simply allowed.

## Fixed
- Fixed bug on legacy header where it would be in desktop mode on mobile devices.

## [2.10.6] - 2019-03-26

### Fixed

- Use Store Name as default Logo Title.

## [2.10.5] - 2019-03-14

### Fixed

- `Header` now queries DOM for its container size and pass it to `Spacer`.

## [2.10.4] - 2019-03-14

### Fixed

- Remove specific variation from messages files.

## [2.10.3] - 2019-03-06

### Fixed

- Logo not showing on mobile devices.

## [2.10.2] - 2019-03-01

### Changed

- `Collapsible` animation changed from timing to spring based.
- Improve project structure to reuse proptypes and defaultProps declarations on multiple components.
- Make `Icons`, `Logo`, and `Collapsible` configurable through `Header`.

## [2.10.1] - 2019-03-01

### Added

- Add snapshot tests.

### Changed

- Using `store-icons` instead of `dreamstore-icons`

## [2.10.0] - 2019-02-26

### Added

- Missing css namespaces for `Collapsible`.
- `user-address` extension point.

## [2.9.4] - 2019-02-14

## [2.9.3] - 2019-02-14

## [2.9.2] - 2019-02-13

### Changed

- `Header` as a functional component and using useRuntime hook.
- Support for `menu-link`.
- Better support for extra headers.

## [2.9.1] - 2019-02-13

### Fixed

- Adjust top distance when extra headers do not exist.

## [2.9.0] - 2019-02-12

### Changed

- Adjust style in order to match the new design.
- Break into multiple components for better maintenance.
- Detach the scroll/animation logic from the component to improve reusability.
- Add animation when user scrolls up and down.

## [2.7.1] - 2019-02-01

## [2.7.0] - 2019-01-30

### Changed

- Use icons from `vtex.dreamstore-icons`.

## [2.6.3] - 2019-01-29

### Fixed

- Remove `inheritComponent` from blocks.

## [2.6.2] - 2019-01-28

### Fixed

- Prevent the size of the header bouncing across different pages.

## [2.6.1] - 2019-01-26

### Changed

- Remove `global.css`.

## [2.6.0] - 2019-01-22

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
