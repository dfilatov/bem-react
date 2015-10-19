var createClass = require('../lib/createClass'),
    React = require('react'),
    ReactDOMServer = require('react-dom/server');

describe('createClass', function() {
    it( 'should return constructor', function() {
        expect(
            typeof createClass({ render : function() {}})
        ).toBe( 'function' );
    } );

//    "No `render` method …" warn will be shown by ReactCompositeComponentMixin.mountComponent
//    and
//    "TypeError: inst.render is not a function" will be thrown by
//    ReactCompositeComponentMixin._renderValidatedComponentWithoutOwnerOrContext
    it( 'should throw error if "render" method isn\'t specified', function() {
        expect(function() {
            ReactDOMServer.renderToStaticMarkup( React.createElement(
                createClass({}),
                {}
            ) )
        }).toThrowError( 'Invariant Violation: createClass(...): Class specification must implement a `render` method.' );
    } );
});
