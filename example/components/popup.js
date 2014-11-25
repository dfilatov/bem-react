var bemReact = require('../../lib/bemReact');

module.exports = bemReact.createClass({
    render : function() {
        return {
            block : 'popup',
            mods : {
                visible : this.props.visible
            },
            tag : 'div',
            onClick : this._onClick,
            content : this.props.content
        };
    }
});
