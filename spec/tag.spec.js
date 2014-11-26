var bemReact = require('../lib/bemReact');

describe('tag', function() {
    it('for block should be <div/> by default', function() {
        var Block = bemReact.createClass({
                render : function() {
                    return {
                        block : 'test'
                    };
                }
            });

        expect(bemReact.renderToStaticMarkup({ block : Block }))
            .toBe('<div class="test"></div>');
    });

    it('should use "tag" field', function() {
        var Block = bemReact.createClass({
                render : function() {
                    return {
                        block : 'test',
                        tag : 'span'
                    };
                }
            });

        expect(bemReact.renderToStaticMarkup({ block : Block }))
            .toBe('<span class="test"></span>');
    });
});
