# BemReact

BemReact is a small module on top of [React](https://github.com/facebook/react/).

It:
  * enables you to use bemjson in templates instead of jsx or plain js
  * takes over generating of css classes based on BEM

## Getting Started

```js
var BemReact = require('bem-react');
```

## Building component
BemReact's component is the same as React's component except you should provide `renderBemJson` method instead of `render`.

```js
var Button = BemReact.createClass({
    renderBemJson : function() {
        return {
            block : 'button',
            tag : 'button',
            mods : {
                theme : this.props.theme,
                size : this.props.size,
                pressed : this.state.pressed,
                focused : this.state.focused,
                disabled : this.props.disabled
            }
        };
    }
});

```
## Using component
```js
BemReact.render(
    { block : Button, theme : 'islands', size : 'xl', disabled : true },
    document.body);
```

## Top-Level API

API is the similar to original React API:

### createClass(Object specification)

### render(Object componentJson, DOMElement container, [Function callback])

### renderToString(Object componentJson)

### renderToStaticMarkup(Object componentJson)

### unmountComponentAtNode(DOMElement container)

