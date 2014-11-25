var react = require('react'),
    buildBemClassName = require('./buildBemClassName'),
    bemJsonToReact = require('./bemJsonToReact');

module.exports = function(spec) {
    var origRender = spec.render;
    spec.render = function() {
        var json = origRender.call(this);

        if(!json.block) {
            throw Error('Specify block');
        }

        if(!json.tag) {
            throw Error('Specify tag');
        }

        json.className = buildBemClassName(json.block, json.mods, this.props.mix);

        var children;
        if(typeof json.content !== 'undefined') {
            children = bemJsonToReact(json.content, json.block);
            json.content = null;
        }

        return react.createElement(
            json.tag,
            json,
            children);
    };

    return react.createClass(spec);
};
