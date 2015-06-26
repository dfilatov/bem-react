var react = require('react'),
    options = require('./options'),
    createClass = require('./createClass'),
    createBemComponent = require('./createBemComponent');

exports.setOptions = function(newOptions) {
    options.set(newOptions);
};

exports.createClass = createClass;

exports.unmountComponentAtNode = function(container) {
    return react.unmountComponentAtNode(container);
};

['render', 'renderToString', 'renderToStaticMarkup'].forEach(function(method) {
    var reactMethod = react[method];
    exports[method] = function(element) {
        element = createBemComponent(element);
        return reactMethod.apply(react, arguments);
    };
});
