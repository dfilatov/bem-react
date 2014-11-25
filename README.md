# bem-react [![NPM version](https://badge.fury.io/js/bem-react.png)](http://badge.fury.io/js/bem-react) [![Build Status](https://travis-ci.org/dfilatov/bem-react.svg?branch=master)](https://travis-ci.org/dfilatov/bem-react)

`bem-react` is a module on top of [React](https://github.com/facebook/react/) which joins awesome React with some good BEM-specific features.

Its main goals:
  * provide ability to use some kind of bemjson in templates and during usage (instead of ugly jsx or plain js)
  * take over manipulation of css classes based on BEM (instead of annoying string concatenation or `React.addons.classSet` which is also clumsy for BEM-like css classes)

## Getting Started

### Installation
via npm: `npm install bem-react`

via bower: `bower install bem-react`

## Building a component
BemReact's component is the same as React's one except you should return bemjson from `render` method.

Example:
```js
var BemReact = require('bem-react');

var Button = BemReact.createClass({
    getInitialState : function() {
        return {
            focused : this.props.focused
        };
    },
    
    _onFocus : function() {
        this.setState({ focused : true });
    },

    _onBlur : function() {
        this.setState({ focused : false });
    },

    render : function() {
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
## Using a component
```js
BemReact.render(
    { block : Button, size : 'xl', disabled : true, text : 'click me' },
    document.body);
// inserts to body following html:
// <button class="button button_size_xl button_disabled">click me</button>
```
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

    render : function() {
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

## BEMJSON
There're two kind of bemjson items.
### 1. bemjson of current rendered component
You're able to use following additional fields in top-level item returned from `render`:
  * *String* **block** block name, required
  * *String* **tag** html tag, required
  * *Object* **mods** modifiers (boolean modifiers are supported as well), optional
  * * **children** children (it's the same as `content` field of original version of bemjson), optional

Be careful, there's no special `attrs` field, all fields are attributes.

### 2. Links to other components
You're able to use following additional fields:
  * *Function* **block** link to another block, required
  * *Array* **mix** mixed elements, optional
  * * **children** children, optional
## Top-Level API

API is the similar to the original React's API:

#### createClass(*Object* specification)

#### render(*Object* componentJson, *DOMElement* container, [*Function* callback])

#### renderToString(*Object* componentJson)

#### renderToStaticMarkup(*Object* componentJson)

#### unmountComponentAtNode(*DOMElement* container)
