# VTEX Header

## Description

The VTEX Header app is a store component used to display logo, minicart, search bar, telemarketing , category menu, menu link and login. This app is used by store theme.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Release schedule

| Release |       Status        | Initial Release | Maintenance LTS Start | End-of-life | Store Compatibility |
| :-----: | :-----------------: | :-------------: | :-------------------: | :---------: | :-----------------: |
|  [2.x]  | **Current Release** |   2018-11-08    |                       |             |         2.x         |
|  [1.x]  | **Maintenance LTS** |   2018-09-18    |      2018-11-08       | March 2019  |         1.x         |

See our [LTS policy](https://github.com/vtex-apps/awesome-io#lts-policy) for more information.

## Table of Contents

- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS namespaces](#css-namespaces)
- [Troubleshooting](#troubleshooting)
- [Tests](#tests)

## Usage

This app uses our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

To configure or customize this app, you need to import it in your dependencies in `manifest.json`.

```json
  dependencies: {
    "vtex.store-header": "2.x"
  }
```

Then, add `header` block into your app theme as we do in our [Store theme app](https://github.com/vtex-apps/store-theme/blob/master/store/blocks.json).

Now, select the desired blocks, for example:

```json
"header.full": {
  "blocks": [
    "login",
    "minicart",
    "logo",
    "search-bar",
    "menu-link",
    "telemarketing",
    "category-menu"
  ]
}
```

### Blocks API

When implementing apps as a block various inner blocks may be available. The following interface lists the available blocks within `header` and describes if they are required or optional.

```json
"header": {
  "allowed": [
    "minicart",
    "login",
    "menu-link",
    "category-menu",
    "search-bar",
    "theme"
  ],
  "required": [
    "telemarketing",
    "logo"
  ],
  "component": "index"
},

"header.full": {
  "allowed": [
    "menu-link",
    "theme"
  ],
  "required": [
    "telemarketing",
    "logo",
    "minicart",
    "login",
    "category-menu",
    "search-bar"
  ],
  "component": "index"
},
}
```

It's essential to remark that, the `header` has the default and `full` versions defined as blocks by **`header`** and **`header.full`** respectively.

The **`header.full`** has `telemarketing`, `logo`, `minicart`, `login`, `category-menu` and `search-bar` as required inner-blocks, meanwhile **`header`** only requires `telemarketing` and `logo`. The `menu-link` and `theme` blocks are optional in both versions.

Note that every `header` implementation must append all required blocks within its version. Similarly, each inner block has its own configurable structure. There is a link to its API in the next section.

#### Configuration

Through the Storefront, you can change the headers's behavior and interface. However, you also can make in your theme app, as Store theme does.

| Prop name       | Type      | Description                                       | Default value |
| --------------- | --------- | ------------------------------------------------- | ------------- |
| `leanWhen`      | `String`  | Cases in which the menu is in lean mode           | 'a^'          |
| `linkUrl`       | `String`  | Address opened when the user clicks the logo      | '/'           |
| `logoUrl`       | `String`  | URL of the logo image                             | ''            |
| `logoTitle`     | `String`  | Alt text for the logo                             | ''            |
| `showSearchBar` | `Boolean` | Sets whether the search bar is visible or not     | true          |
| `showLogin`     | `Boolean` | Sets whether the login button is displayed or not | true          |

Also, you can configure the product summary that is defined on header. See [here](https://github.com/vtex-apps/product-summary/blob/master/README.md#configuration) the Product Summary API.

### Styles API

This app provides some CSS classes as an API for style customization.

To use this CSS API, you must add the `styles` builder and create an app styling CSS file.

1. Add the `styles` builder to your `manifest.json`:

```json
  "builders": {
    "styles": "1.x"
  }
```

2. Create a file called `vtex.header.css` inside the `styles/css` folder. Add your custom styles:

```css
.container {
  margin-top: 10px;
}
```

#### CSS namespaces

Below, we describe the namespaces that are defined in the minicart.

| Class name        | Description                                                  | Component Source                                        |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| `container`       | The main container of minicart                               | [index](/react/index.js)                                |
| `label`           | Minicart icon label                                          | [index](/react/index.js)                                |
| `badge`           | Minicart badge with the product quantity on it               | [index](/react/index.js)                                |
| `arrowUp`         | Popup box arrow                                              | [Popup](/react/components/Popup.js)                     |
| `box`             | The main container of the popup                              | [Popup](/react/components/Popup.js)                     |
| `sidebarHeader`   | Minicart sidebar header container                            | [Sidebar](/react/components/Sidebar.js)                 |
| `sidebar`         | Minicart sidebar main container                              | [Sidebar](/react/components/Sidebar.js)                 |
| `sidebarOpen`     | Active when the sidebar is opened                            | [Sidebar](/react/components/Sidebar.js)                 |
| `content`         | The container for the Minicart contents                      | [MinicartContent](/react/components/MinicartContent.js) |
| `contentSmall`    | The container for the minicart contents when on desktop size | [MinicartContent](/react/components/MinicartContent.js) |
| `contentLarge`    | The container for the minicart contents when on mobile size  | [MinicartContent](/react/components/MinicartContent.js) |
| `contentDiscount` | The total discount on the minicart footer                    | [MinicartFooter](/react/components/MinicartFooter.js)   |
| `contentPrice`    | Total price of the products on the minicart footer           | [MinicartFooter](/react/components/MinicartFooter.js)   |
| `contentFooter`   | The minicart footer main container                           | [MinicartFooter](/react/components/MinicartFooter.js)   |

## Troubleshooting

You can check if others are passing through similar issues [here](https://github.com/vtex-apps/minicart/issues). Also feel free to [open issues](https://github.com/vtex-apps/minicart/issues/new) or contribute with pull requests.

## Tests

To execute our tests go to `react/` folder and run `yarn test`
