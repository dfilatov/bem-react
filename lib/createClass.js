var react = require('react'),
    buildBemClassName = require('./buildBemClassName'),
    bemJsonToReact = require('./bemJsonToReact');

module.exports = function(spec) {
    var origRender = spec.render;
    if(!origRender) {
        throw Error('createClass: "render" method should be specified');
    }
    spec.render = function() {
        var json = origRender.call(this);

        if(!json) {
            throw Error('render: should return bemjson');
        }

        if(!json.block) {
            throw Error('render: block should be specified in returned bemjson');
        }

        if(typeof json.block !== 'string') {
            throw Error('render: block should be a string');
        }

        (json.attrs || (json.attrs = {}))
            .className = buildBemClassName(json.block, json.mods, this.props.mix);

        return react.createElement(
            json.tag || 'div',
            json.attrs,
            bemJsonToReact(json.content, json.block));
    };

    return react.createClass(spec);
};
