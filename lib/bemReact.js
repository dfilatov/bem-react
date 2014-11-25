var react = require('react'),
    bemMixin = require('./bemMixin');

exports.createClass = function(spec) {
    spec.mixins?
        spec.mixins.unshift(bemMixin) :
        spec.mixins = [bemMixin];

    return react.createClass(spec);
};

exports.unmountComponentAtNode = function(container) {
    return react.unmountComponentAtNode(container);
};

['render', 'renderToString', 'renderToStaticMarkup'].forEach(function(method) {
    var reactMethod = react[method];
    exports[method] = function(element) {
        if(!element || !element.block) {
            throw Error(method + ': invalid bem component json');
        }

        element = react.createElement(element.block, element);
        return reactMethod.apply(react, arguments);
    };
});
