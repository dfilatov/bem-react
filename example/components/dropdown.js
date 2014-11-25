var bemReact = require('../../lib/bemReact'),
    Button = require('./button'),
    Popup = require('./popup');

module.exports = bemReact.createClass({
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
