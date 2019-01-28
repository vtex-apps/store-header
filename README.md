# Header

Header is a canonical component that any VTEX app can import.

## Release schedule
| Release  | Status              | Initial Release | Maintenance LTS Start | End-of-life | Dreamstore Compatibility
| :--:     | :---:               |  :---:          | :---:                 | :---:       | :---: 
| [1.x]    | **Maintenance LTS** |  2018-09-18     | 2018-11-08            | March 2019  | 1.x
| [2.x]    | **Current Release** |  2018-11-08     |                       |             | 2.x

To import it into your code:

```js
import Header from 'vtex.store-header'
```
Also, you can import as a dependency in your `manifest.json`
```json
  dependencies: {
    "vtex.store-header": "2.x"
  }
```

## Usage

You can use it in your code like a React component with the jsx tag: `<Header />`.

```jsx
<Header />
```
### Drepecated
Or, you can add in your `pages.json`: 
```json
 "store/header": {
      "component": "vtex.dreamstore-header/index"
 }
```

See an example at [Dreamstore](https://github.com/vtex-apps/dreamstore-theme/blob/master/pages/pages.json#L7) and [Store](https://github.com/vtex-apps/store/blob/master/react/StoreTemplate.js#L14) apps
