var MOD_DELIM = '_',
    ELEM_DELIM = '__';

module.exports = function buildBemClassName(block, elem, mods, mix) {
    if(typeof elem !== 'string') {
        mix = mods;
        mods = elem;
        elem = null;
    }

    var entity = block + (elem? ELEM_DELIM + elem : ''),
        res = entity;

    for(var modName in mods) {
        mods.hasOwnProperty(modName) && mods[modName] &&
            (res += ' ' + entity + MOD_DELIM + modName +
                (mods[modName] === true? '' : MOD_DELIM + mods[modName]));
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
