var bemReact = require('../lib/bemReact'),
    React = require('react'),
    ReactDOMServer = require('react-dom/server');

describe('render', function() {

    it( 'should accept element from bem component json', function() {
        var Block = bemReact.createClass({
            render : function() {
                return {
                    block : 'test',
                    tag : 'span'
                };
            }
        });

        expect(
            ReactDOMServer.renderToStaticMarkup( React.createElement(
                Block,
                {}
            ) )
        ).toBe( '<span class="test"></span>' );
    } );

    it( 'should accept React\'s element in bem component json', function() {
        var ReactComponent = React.createClass({
            render : function() {
                return React.createElement( 'input', this.props );
            }
        });

        var BEMComponent = bemReact.createClass( {
            render: function() {
                return {
                    block : 'test',
                    tag : 'div',
                    content: React.createElement( ReactComponent, this.props )
                }
            }
        } )

        expect(
            ReactDOMServer.renderToStaticMarkup( React.createElement(
                BEMComponent,
                { disabled : true }
            ) )
        ).toBe( '<div class="test"><input disabled=""/></div>' );
    });

    it( 'should accept nested bem-json components', function() {
        var BEMComponent1 = bemReact.createClass( {
            render: function() {
                return {
                    block : 'link',
                    tag : 'a',
                    props: {
                        href: 'https://ru.bem.info/'
                    },
                    content: 'b_'
                }
            }
        } )

        var BEMComponent2 = bemReact.createClass( {
            render: function() {
                return {
                    block : 'test',
                    tag : 'div',
                    content: React.createElement( BEMComponent1, this.props )
                }
            }
        } )

        expect(
            ReactDOMServer.renderToStaticMarkup( React.createElement(
                BEMComponent2,
                {}
            ) )
        ).toBe( '<div class="test"><a href="https://ru.bem.info/" class="link">b_</a></div>' );
    });

    it( 'should throw error if block isn\'t specified in input', function() {
        var InvalidComponent = bemReact.createClass( {
            render: function() {
                return {
                    foo: 'bat'
                }
            }
        } )

        expect( function() {
            ReactDOMServer.renderToStaticMarkup( React.createElement(
                InvalidComponent,
                {}
            ) )
        } ).toThrowError( 'render: block should be specified in returned bemjson' );
    });
});
