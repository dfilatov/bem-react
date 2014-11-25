var buildBemClassName = require('../lib/buildBemClassName');

describe('buildBemClassName', function() {
    it('should build block class name', function() {
        expect(buildBemClassName('button'))
            .toBe('button');
    });

    it('should build block with modifiers class name', function() {
        expect(
            buildBemClassName('button', { mod1 : 'val1', mod2 : 'val2' }))
            .toBe('button button_mod1_val1 button_mod2_val2');
    });

    it('should build elem class name', function() {
        expect(buildBemClassName('button', 'box'))
            .toBe('button__box');
    });

    it('should build elem with modifiers class name', function() {
        expect(buildBemClassName('button', 'box', { mod1 : 'val1', mod2 : 'val2' }))
            .toBe('button__box button__box_mod1_val1 button__box_mod2_val2');
    });

    it('should build block with mixed elem class name', function() {
        expect(buildBemClassName('button', null, [{ block : 'mixed', elem : 'elem' }]))
            .toBe('button mixed__elem');
    });

    it('should throw error if mix contains block only', function() {
        expect(function() {
            buildBemClassName('button', null, [{ block : 'mixed' }])
        }).toThrowError('Specify both block and elem in mix');
    });

    it('should throw error if mix only contains elem', function() {
        expect(function() {
            buildBemClassName('button', null, [{ elem : 'mixed' }])
        }).toThrowError('Specify both block and elem in mix');
    });
});
