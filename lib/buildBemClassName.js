var options = require('./options');

module.exports = function buildBemClassName(block, elem, mods, mix) {
    var opts = options.get();

    if(typeof elem !== 'string') {
        mix = mods;
        mods = elem;
        elem = null;
    }

    var entity = block + (elem? opts.elemDelim + elem : ''),
        res = entity;

    for(var modName in mods) {
        mods.hasOwnProperty(modName) && mods[modName] &&
            (res += ' ' + entity + opts.modDelim + modName +
                (mods[modName] === true? '' : opts.modValDelim + mods[modName]));
    }

    if(mix) {
        var i = 0,
            mixItem;

        while(mixItem = mix[i++]) {
            if(!mixItem.block || !mixItem.elem) {
                throw Error('render: both block and elem should be specified in mix');
            }

            res += ' ' + buildBemClassName(mixItem.block, mixItem.elem, mixItem.mods);
        }
    }

    return res;
};
