var State = require('./state.js');
var Shortcodes = require('../shortcodes');

module.exports = (function () {
    var exports = {};


    function getSets(list) {
        var sets = [];

        for (var code in list) {
            for (var i = 0; i < code.length; i++) {
                sets[i] = sets[i] || [];

                if (sets[i].indexOf(code[i]) === -1) {
                    sets[i].push(code[i]);
                }
            }
        }

        return sets;
    }

    exports.isPart = function (str) {
        var _sets = getSets(Shortcodes);
        for (var i = str.length - 1; i >= 0; i--) {
            if (!_sets[i] || _sets[i].indexOf(str[i]) === -1) {
                return false;
            }
        }

        return true;
    };

    exports.get = function (key) {
        if (Shortcodes[key]) {
            return Shortcodes[key];
        } else {
            return null;
        }
    };

    exports.getAll = function () {
        return Shortcodes;
    };

    return exports;
})();

State.on('behavior_change', function (key, value) {
    if (key == 'reload') {
        Shortcodes = Object.assign(Shortcodes, value);
    }
});