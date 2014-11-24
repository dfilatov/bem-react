function getModule(React) {

    var MOD_DELIM = '_',
        ELEM_DELIM = '__';

    function bemJsonToReact(json, curBlock) {
        if(json) {
            if(Array.isArray(json)) {
                return json.map(function(item) {
                    return bemJsonToReact(item, curBlock);
                });
            }

            if(json.elem) {
                if(!json.tag) {
                    throw Error('Specify tag');
                }

                json.className = buildBemClassName((json.block || curBlock) + ELEM_DELIM + json.elem, json.mods, json.mix);
                return React.createElement(json.tag, json, bemJsonToReact(json.children));
            }

            if(json.block) {
                return React.createElement(json.block, json);
            }
        }

        return json;
    }

    function buildBemClassName(bemEntity, mods, mix) {
        var res = bemEntity;

        for(var modName in mods) {
            mods[modName] &&
                (res += ' ' + bemEntity + MOD_DELIM + modName +
                    (mods[modName] === true? '' : MOD_DELIM + mods[modName]));
        }

        if(mix) {
            var i = 0,
                mixItem;
            while(mixItem = mix[i++]) {
                if(!mixItem.block || !mixItem.elem) {
                    throw Error('Specify both block and elem in mix');
                }

                res += ' ' + buildBemClassName(mixItem.block + ELEM_DELIM + mixItem.elem, mixItem.mods);
            }
        }

        return res;
    }

    var bemMixin = {
            render : function() {
                var json = this.renderToBemJson();

                if(!json.block) {
                    throw Error('Specify block');
                }

                if(!json.tag) {
                    throw Error('Specify tag');
                }

                json.className = buildBemClassName(json.block, json.mods, this.props.mix);

                return React.createElement(
                    json.tag,
                    json,
                    bemJsonToReact(json.children, json.block));
            }
        },
        exports = {
            createClass : function(spec) {
                spec.mixins?
                    spec.mixins.unshift(bemMixin) :
                    spec.mixins = [bemMixin];

                return React.createClass(spec);
            },

            unmountComponentAtNode : function(container) {
                return React.unmountComponentAtNode(container);
            }
        };

    ['render', 'renderToString', 'renderToStaticMarkup'].forEach(function(method) {
        var reactMethod = React[method];
        exports[method] = function(element) {
            if(!element || !element.block) {
                throw Error(method + ': invalid bem component json');
            }

            element = React.createElement(element.block, element);
            return reactMethod.apply(React, arguments);
        };
    });

    return exports;
}

if(typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = getModule(require('react'));
}
else {
    var BemReact = getModule(React);
}
