var bemReact = require('../lib/bemReact'),
    react = require('react');

describe('render', function() {
    var Block;
    beforeEach(function() {
        Block = bemReact.createClass({
            render : function() {
                return {
                    block : 'test',
                    tag : 'span'
                };
            }
        });
    });

    it('should accept bem component json', function() {
        expect(bemReact.renderToStaticMarkup({ block : Block }))
            .toBe('<span class="test"></span>');
    });

    it('should accept React\'s element in bem component json', function() {
        var ReactComponent = react.createClass({
                render : function() {
                    return react.createElement('div', this.props);
                }
            });

        expect(bemReact.renderToStaticMarkup({ block : ReactComponent, disabled : true }))
            .toBe('<div disabled></div>');
    });

    it('should throw error if block isn\'t specified in input', function() {
        expect(function() {
            bemReact.renderToStaticMarkup({ foo : 'bar' });
        }).toThrowError('render: invalid bem component json');
    });
});
