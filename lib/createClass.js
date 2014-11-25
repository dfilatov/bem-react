var react = require('react'),
    buildBemClassName = require('./buildBemClassName'),
    bemJsonToReact = require('./bemJsonToReact');

module.exports = function(spec) {
    var origRender = spec.render;
    if(!origRender) {
        throw Error('Specify render method');
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

        if(!json.tag) {
            throw Error('render: tag should be specified in returned bemjson');
        }

        json.className = buildBemClassName(json.block, json.mods, this.props.mix);

        return react.createElement(
            json.tag,
            json,
            bemJsonToReact(json.children, json.block));
    };

    return react.createClass(spec);
};
