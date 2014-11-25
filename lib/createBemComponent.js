var react = require('react');

module.exports = function(json) {
    if(!json || !json.block) {
        throw Error('render: invalid bem component json');
    }

    var typeOfBlock = typeof json.block;
    if(typeOfBlock !== 'function') {
        throw Error('render: reference to block should be a constructor, not a ' + typeOfBlock);
    }

    return react.createElement(json.block, json);
};
