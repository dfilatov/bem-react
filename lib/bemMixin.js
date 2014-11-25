var react = require('react'),
    buildBemClassName = require('./buildBemClassName'),
    bemJsonToReact = require('./bemJsonToReact');

module.exports = {
    render : function() {
        var json = this.renderToBemJson();

        if(!json.block) {
            throw Error('Specify block');
        }

        if(!json.tag) {
            throw Error('Specify tag');
        }

        json.className = buildBemClassName(json.block, json.mods, this.props.mix);

        return react.createElement(
            json.tag,
            json,
            bemJsonToReact(json.children, json.block));
    }
};
