var bemReact = require('../lib/bemReact'),
    React = require('react'),
    ReactDOMServer = require('react-dom/server');

describe('tag', function() {
    it( 'for block should be <div/> by default', function() {
        var Block = bemReact.createClass({
            render : function() {
                return {
                    block : 'test'
                };
            }
        });

        expect(
            ReactDOMServer.renderToStaticMarkup( React.createElement( Block ))
        ).toBe('<div class="test"></div>');
    } );

    it( 'should use "tag" field', function() {
        var Block = bemReact.createClass({
                render : function() {
                    return {
                        block : 'test',
                        tag : 'span'
                    };
                }
            });

        expect(
            ReactDOMServer.renderToStaticMarkup( React.createElement( Block ) )
        ).toBe('<span class="test"></span>');
    } );
});
