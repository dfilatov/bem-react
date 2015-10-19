var react = require('react'),
    buildBemClassName = require('./buildBemClassName'),
    bemJsonToReact = require('./bemJsonToReact');

module.exports = function(spec) {
    var origRender = spec.render;

//    "No `render` method …" warn will be shown by ReactCompositeComponentMixin.mountComponent
    if( origRender instanceof Function ) {
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

            (json.props || (json.props = {}))
                .className = buildBemClassName(json.block, json.mods, this.props.mix);

            return react.createElement(
                json.tag || 'div',
                json.props,
                bemJsonToReact(json.content, json.block, this));
        };
    }

    spec.getParent = function() {
        return this.props.__parent;
    };

    return react.createClass(spec);
};
