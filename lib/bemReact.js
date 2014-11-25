var react = require('react'),
    createClass = require('./createClass');

exports.createClass = createClass;

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
