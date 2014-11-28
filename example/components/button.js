var bemReact = require('../../lib/bemReact');

module.exports = bemReact.createClass({
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

    render : function() {
        return {
            block : 'button',
            mods : {
                disabled : this.props.disabled,
                pressed : this.state.pressed,
                focused : this.state.focused
            },
            tag : 'button',
            props : {
                onMouseDown : this._onMouseDown,
                onFocus : this._onFocus,
                onBlur : this._onBlur,
                onClick : this.props.onClick,
                disabled : this.props.disabled
            },
            content : this.props.text
        };
    }
});
