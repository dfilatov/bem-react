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
                throw Error('render: tag should be specified in elem');
            }

            json.className = buildBemClassName(json.block || curBlock, json.elem, json.mods, json.mix);

            var children;
            if(typeof json.content !== 'undefined') {
                children = bemJsonToReact(json.content, curBlock);
                json.content = null;
            }

            return react.createElement(json.tag, json, children);
        }

        if(json.block) {
            return react.createElement(json.block, json);
        }
    }

    return json;
};
