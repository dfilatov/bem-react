var react = require('react'),
    buildBemClassName = require('./buildBemClassName');

module.exports = function bemJsonToReact(json, curBlock) {
    if(json) {
        if(Array.isArray(json)) {
            return json.map(function(item) {
                return bemJsonToReact(item, curBlock);
            });
        }

        if(json.elem) {
            if(!json.tag) {
                throw Error('Specify tag');
            }

            json.className = buildBemClassName(json.block || curBlock, json.elem, json.mods, json.mix);
            return react.createElement(json.tag, json, bemJsonToReact(json.children));
        }

        if(json.block) {
            return react.createElement(json.block, json);
        }
    }

    return json;
};
