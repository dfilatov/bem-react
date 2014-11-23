var Button = BemReact.createClass({
    getInitialState : function() {
        return {
            pressed : false,
            focused : !!this.props.focused
        };
    },

    componentWillUnmount: function() {
        document.removeEventListener('mouseup', this._onMouseUp);
    },

    _onMouseDown : function() {
        this.setState({ pressed : true });
        document.addEventListener('mouseup', this._onMouseUp);
    },

    _onMouseUp : function(e) {
        this.setState({ pressed : false });
        document.removeEventListener('mouseup', this._onMouseUp);
    },

    _onFocus : function() {
        this.setState({ focused : true });
    },

    _onBlur : function() {
        this.setState({ focused : false });
    },

    renderBemJson : function() {
        return {
            block : 'button',
            mods : {
                disabled : this.props.disabled,
                pressed : this.state.pressed,
                focused : this.state.focused
            },
            tag : 'button',
            onMouseDown : this._onMouseDown,
            onFocus : this._onFocus,
            onBlur : this._onBlur,
            onClick : this.props.onClick,
            disabled : this.props.disabled,
            children : this.props.text
        };
    }
});

var Popup = BemReact.createClass({
    renderBemJson : function() {
        return {
            block : 'popup',
            mods : {
                visible : this.props.visible
            },
            tag : 'div',
            onClick : this._onClick,
            children : this.props.children
        };
    }
});

var Input = BemReact.createClass({
    getInitialState : function() {
        return {
            value : this.props.value || '',
            focused : !!this.props.focused
        };
    },

    componentDidMount : function() {
        this.state.focused && this.focus();
    },

    focus : function() {
        this.refs.control.getDOMNode().focus();
    },

    _onFocus : function() {
        this.setState({ focused : true });
    },

    _onBlur : function() {
        this.setState({ focused : false });
    },

    _onChange : function(e) {
        var newValue = e.target.value;
        this.setState({ value : newValue });
        this.props.onChanged && this.props.onChanged(newValue);
    },

    _onClearClick : function() {
        this.setState({ value : '' }, this.focus);
    },

    renderBemJson : function() {
        var children = [{
                elem : 'control',
                tag : 'input',
                key : 'control',
                ref : 'control',
                value : this.state.value,
                onFocus : this._onFocus,
                onBlur : this._onBlur,
                onChange : this._onChange
            }];

        if(this.props.hasClear && this.state.value) {
            children.push({
                elem : 'clear',
                tag : 'span',
                key : 'clear',
                onClick : this._onClearClick,
                children : 'X'
            });
        }

        return {
            block : 'input',
            tag : 'div',
            mods : {
                theme : this.props.theme,
                'has-clear' : this.props.hasClear,
                focused : this.state.focused
            },
            children : children
        };
    }
});

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
                    text : 'dropdown-button',
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