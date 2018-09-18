# Header

Header is a canonical component that any VTEX app can import.

To import it into your code:

```js
import Header from 'vtex.dreamstore-header'
```
Also, you can import as a dependency in your `manifest.json`
```json
  dependencies: {
    "vtex.dreamstore-header": "1.x"
  }
```

## Usage

You can use it in your code like a React component with the jsx tag: `<Header />`.

```jsx
<Header />
```

Or, you can add in your `pages.json`: 
```json
 "store/header": {
      "component": "vtex.dreamstore-header/index"
 }
```

See an example at [Dreamstore](https://github.com/vtex-apps/dreamstore-theme/blob/master/pages/pages.json#L7) and [Store](https://github.com/vtex-apps/store/blob/master/react/StoreTemplate.js#L14) apps
