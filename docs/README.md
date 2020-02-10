📢 Use this project, [contribute](https://github.com/vtex-apps/breadcrumb) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Header

The VTEX Header app is responsible for displaying a **navigation bar** fixed on a store's page upper side. 
Other blocks that are important for user navigation are found in the Header, for example the store's [logo](https://vtex.io/docs/components/all/vtex.store-components/logo), the [minicart](https://vtex.io/docs/components/all/vtex.minicart/), user [login](https://vtex.io/docs/components/all/vtex.login/) and [search bar](https://vtex.io/docs/components/all/vtex.store-components/search-bar).

![header](https://user-images.githubusercontent.com/52087100/74090325-b6235d00-4a88-11ea-8227-317f93204d8f.png) 

## Configuration

1. Import the `store-header` app to your theme's dependencies in `manifest.json`: 

```json
  dependencies: {
    "vtex.store-header": "2.x"
  }
```

The  `Header` is comprised of 3 others blocks: the `header-layout`, that in practice subdivides in two (`header-layout.desktop` and `header-layout.mobile`), the `header-row` and the `header-border`. 

2. First off, declare the two `header-layout` blocks, allowing you to define how the Header should be displayed for both mobile and desktop:

```json
{
"header": {
"blocks": [
"header-layout.desktop",
"header-layout.mobile"
]
},
```

3. Configure both `header-layout.desktop` and `header-layout.mobile`, declaring `header-row` to create Header lines according to your store needs. 

In the example below, we will configure 4 different levels for `header-layout.desktop`. It will thus be possible to replicate the Header displayed above sheltering the telemarketing functionalities (when activated), a notification, links to pages and every other blocks, such as Logo, Menu, etc.

```json
{
"header": {
"blocks": [
"header-layout.desktop",
"header-layout.mobile"
]
},
"header-layout.desktop": {
"children": [
"header-row#1-desktop",
"header-row#2-desktop",
"header-row#3-desktop",
"header-row#4-desktop"
]
},
```

Remember that the number of `header-row`s *should meet your business needs, determining how many Header lines you want to apply to your store.*

4. Configure each of the `header-row`s , applying props and declaring the blocks for each line. To correctly structure your Header, you should check the [documentation](https://vtex.io/docs/components/all) for each of the desired blocks. The most commonly used are [Logo](https://vtex.io/docs/components/all/vtex.store-components/logo), [Minicart](https://vtex.io/docs/components/all/vtex.minicart/) and [Menu](https://vtex.io/docs/components/all/vtex.menu/). 

In the example below, we're configured the `header-row#1-desktop` as [Telemarketing](https://vtex.io/docs/components/all/vtex.telemarketing/):

```json
"header-row#1-desktop": {
"children": [
"telemarketing"
],
"props": {
"fullWidth": true
}
},
```

- `header-row` props: 

| Prop name  | Type      | Description                                                                                       | Default value |
| ---------- | --------- | ------------------------------------------------------------------------------------ | ------------- |
| `zIndex` | `Number` | CSS property that controls the vertical stacking order of elements for overlapping.                                                                      | `0`         |
| `sticky` | `Boolean` | Whether the Header margin should be fixed on the layout (`true`) or not (`false`)                                                                    | `false`          |
| `fullWidth` | `Boolean` | Whether the Header should take the full width of the screen or not                                                                   | `true`          |
| `inverted` | `Boolean` | Whether the row will use the base color (`false`) or the inverted base color (`true`) as defined in `styles.json`.                                                                    | `false`          |

:warning: You should repeat step 4 for all `header-layout.desktop` `header-rows`, as well as redo steps 3 and 4 to define your `header-layout.mobile`. 

You can add two more blocks to the `header-row`: `header-border` and `header-spacer`. 

- **`header-border`**:

When declared, the `header-border` block adds a `1px` margin to your store's Header.

```json
"header-row#2-desktop": {
"children": [
"header-border",
"notification.bar#home"
],
"props": {
"fullWidth": "true"
}
},
"notification.bar#home": {
"props": {
"content": "SELECTED ITEMS ON SALE! CHECK IT OUT!"
}
},
```

| Prop name  | Type      | Description                                                                                       | Default value |
| ---------- | --------- | ------------------------------------------------------------------------------------ | ------------- |
| `sticky` | `Boolean` | Whether the Header margin should be fixed in the layout or not                                                                       | `false`          |

- **`header-spacer`**: 

The `header-spacer` is tasked with adding spacing between blocks throughout the Header lines. 

```json
"header-row#3-desktop": {
"children": [
"vtex.menu@2.x:menu#websites",
"header-spacer",
"vtex.menu@2.x:menu#institutional"
],
"props": {
"blockClass": "menu-link",
"inverted": "true"
}
},
```

In practice, it will make blocks declared before it position themselves to the left on the screen, whereas blocks that are declared after will be positioned to the right. For example: 

![header-spacer](https://user-images.githubusercontent.com/52087100/74090331-c8050000-4a88-11ea-8566-98097b18c83d.png)

:warning: The Header must be declared in `blocks.jsonc` just once, meaning that when you declare and configure the block in the homepage template, as mentioned in the configuration above, Store Framework will reproduce these same configurations for the remaining store templates behind the scenes. If you want to apply different configurations to the template, check the advanced configurations section below. 

### Advanced configuration

Automatic behind the scenes Header and Footer reproduction in other templates aside from `store.home` is only possible because both blocks are defined as default store interface elements in the `interfaces.json` file from Store Theme. 

This definition in `interfaces.json` enables Store Framework to identify the Header and Footer blocks, declared just once in `blocks.jsonc`, as defaults for all other templates.

To overwrite this automatic duplication in `interfaces.json` and use new configurations in different templates, refer to the step-by-step of the following recipe: [Customizing the Header and Footer](https://vtex.io/docs/recipes/layout/customizing-the-header-and-footer-blocks-by-page). 

## Customization

In order to apply CSS customizations in these and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization). 
| CSS Handles          | 
---------------------- |
| `container`          |                       
| `leanMode`           |                        
| `topMenuContainer`   | 
| `topMenuLogo`        |              
| `topMenuSearchBar`   |     
| `topMenuIcons`       |             
| `topMenuCollapsible` |   
| `forceCenter`        |   
| `forceCenterInnerContainer` |   
| `headerBorder` | 
| `headerSpacer` | 
| `headerStickyRow` | 
| `headerRowContentContainer` |
