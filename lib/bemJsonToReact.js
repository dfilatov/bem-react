var react = require('react'),
    buildBemClassName = require('./buildBemClassName'),
    createBemComponent = require('./createBemComponent');

module.exports = function bemJsonToReact(json, curBlock, parent) {
    if(json) {
        if(Array.isArray(json)) {
            return json.map(function(item) {
                return bemJsonToReact(item, curBlock, parent);
            });
        }

        if(json.elem) {
            if(!json.tag) {
                throw Error('render: tag should be specified in elem');
            }

            (json.props || (json.props = {}))
                .className = buildBemClassName(json.block || curBlock, json.elem, json.mods, json.mix);

            return react.createElement(
                json.tag,
                json.props,
                bemJsonToReact(json.content, curBlock, parent));
        }

        if(json.block) {
            return createBemComponent(json, parent);
        }
    }

    return json;
};
