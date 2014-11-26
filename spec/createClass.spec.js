var createClass = require('../lib/createClass'),
    ReactElement = require('react/lib/ReactElement');

describe('createClass', function() {
    it('should return constructor', function() {
        expect(typeof createClass({ render : function() {}})).toBe('function');
    });

    it('should throw error if "render" method isn\'t specified', function() {
        expect(function() {
            createClass({});
        }).toThrowError('createClass: "render" method should be specified');
    });
});
