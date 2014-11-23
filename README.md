# bem-react

`bem-react` is a module on top of [React](https://github.com/facebook/react/).

Its main goals:
  * provide ability to use some kind of bemjson in templates and during usage (instead of ugly jsx or plain js)
  * take over manipulation of css classes based on BEM (instead of annoying string concatenation or `React.addons.classSet` which is also clumsy for BEM-like css classes)

## Getting Started

### Installation
via npm:

`npm install bem-react`

via bower:

`bower install bem-react`

via script tag:
```html
<script type="text/javasript" src="path-to-bem-react/bem-react.js"></script>
```

## Building component
BemReact's component is the same as React's component except you should provide `renderBemJson` method instead of `render`.

Example:
```js
var BemReact = require('bem-react');

var Button = BemReact.createClass({
    _onFocus : function() {
        this.setState({ focused : true });
    },

    _onBlur : function() {
        this.setState({ focused : false });
    },

    renderBemJson : function() {
        return {
            block : 'button',
            tag : 'button',
            mods : {
                size : this.props.size,
                focused : this.state.focused,
                disabled : this.props.disabled
            },
            children : this.props.text,
            onFocus : this._onFocus,
            onBlur : this._onBlur,
            onClick : this.props.onClick
        };
    }
});
```
You're able to use following special fields (in addition to supported by React) in returned from `renderBemJson` bemjson:
  * *String* **block** block name
  * *String* **tag** html tag
  * *Object* **mods** modifiers (boolean modifiers are supported as well)
  * * **children**
  
Be careful, there's some variation of bemjson and these fields aren't the same as fields in the original version of bemjson.

## Using component
```js
BemReact.render(
    { block : Button, size : 'xl', disabled : true, text : 'click me' },
    document.body);
// inserts to body following html:
// <button class="button button_size_xl button_disabled">click me</button>
```
You're able to use following special fields (in addition to supported by React) when you're using component:
  * *Function* **block** reference to the component
  * *Array* **mix** mixed elements of another blocks. Yes, only elements.

### Composition of components
Let's imagine `Dropdown` component which is the composition of `Button` and `Popup` components:
```js
var Dropdown = BemReact.createClass({
    getInitialState : function() {
        return {
            opened : this.props.opened
        };
    },

    _onButtonClick : function() {
        this.setState({ opened : !this.state.opened });
    },

    renderBemJson : function() {
        return {
            block : 'dropdown',
            mods : {
                opened : this.state.opened,
                disabled : this.props.disabled
            },
            tag : 'div',
            children : [
                {
                    block : Button,
                    key : 'b',
                    disabled : this.props.disabled,
                    text : 'click me',
                    onClick : this._onButtonClick
                },
                {
                    block : Popup,
                    mix : [{ block : 'dropdown', elem : 'popup' }],
                    key : 'p',
                    visible : this.state.opened && !this.props.disabled,
                    children : this.props.children
                }
            ]
        };
    }
});
```

## Top-Level API

API is the similar to the original React's API:

#### createClass(*Object* specification)

#### render(*Object* componentJson, *DOMElement* container, [*Function* callback])

#### renderToString(*Object* componentJson)

#### renderToStaticMarkup(*Object* componentJson)

#### unmountComponentAtNode(*DOMElement* container)
