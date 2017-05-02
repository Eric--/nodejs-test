var path = require('path');
//* jshint esversion: 6 */
// import path from "path";
var _root = path.resolve(__dirname, '..');

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}
exports.root = root;
