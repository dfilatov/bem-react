var options = {
    elemDelim : '__',
    modDelim : '_',
    modValDelim : '_'
};

module.exports = {
    set : function (newOptions) {
        options = newOptions;
    },

    get : function () {
        return options;
    }
};