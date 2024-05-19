"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateFollowpos = exports.computeFunctions = void 0;
var computeFunctions = function (node) {
    switch (node.kind) {
        case 'Symbol':
            node.nullable = false;
            node.firstpos = [node.id];
            node.lastpos = [node.id];
            break;
        case 'Concat':
            (0, exports.computeFunctions)(node.left);
            (0, exports.computeFunctions)(node.right);
            node.nullable = node.left.nullable && node.right.nullable;
            node.firstpos = node.left.nullable
                ? node.left.firstpos.concat(node.right.firstpos)
                : node.left.firstpos;
            node.lastpos = node.right.nullable
                ? node.right.lastpos.concat(node.left.lastpos)
                : node.right.lastpos;
            break;
        case 'Or':
            (0, exports.computeFunctions)(node.left);
            (0, exports.computeFunctions)(node.right);
            node.nullable = node.left.nullable || node.right.nullable;
            node.firstpos = node.left.firstpos.concat(node.right.firstpos);
            node.lastpos = node.left.lastpos.concat(node.right.lastpos);
            break;
        case 'Kleene':
            (0, exports.computeFunctions)(node.body);
            node.nullable = true;
            node.firstpos = node.body.firstpos;
            node.lastpos = node.body.lastpos;
            break;
    }
};
exports.computeFunctions = computeFunctions;
var calculateFollowpos = function (root) {
    var followpos = new Map();
    var symbolMap = new Map();
    var traverse = function (node) {
        symbolMap.set(node.id, node.value);
        switch (node.kind) {
            case 'Concat':
                // Rule 1: If A.B then lastpos(A) is in followpos(B)
                for (var _i = 0, _a = node.left.lastpos; _i < _a.length; _i++) {
                    var i = _a[_i];
                    addFollowpos(i, node.right.firstpos);
                }
                traverse(node.left);
                traverse(node.right);
                break;
            case 'Kleene':
                // Rule 2: If A* then lastpos(A) is in followpos(A)
                for (var _b = 0, _c = node.lastpos; _b < _c.length; _b++) {
                    var i = _c[_b];
                    addFollowpos(i, node.firstpos);
                }
                traverse(node.body);
                break;
            case 'Or':
                traverse(node.left);
                traverse(node.right);
                break;
            case 'Symbol':
                // Terminals don't have followpos
                break;
        }
    };
    var addFollowpos = function (id, set) {
        var _a;
        if (!followpos.has(id)) {
            followpos.set(id, []);
        }
        (_a = followpos.get(id)).push.apply(_a, set);
    };
    traverse(root);
    // Remove duplicates from followpos sets
    for (var _i = 0, _a = Array.from(followpos.entries()); _i < _a.length; _i++) {
        var _b = _a[_i], id = _b[0], set = _b[1];
        followpos.set(id, Array.from(new Set(set)));
    }
    var result = [];
    for (var _c = 0, _d = Array.from(followpos.entries()); _c < _d.length; _c++) {
        var _e = _d[_c], id = _e[0], set = _e[1];
        var symbol = symbolMap.get(id);
        result.push({ symbol: symbol, followpos: set, number: id }); // Add number field
    }
    result.sort(function (a, b) { return a.number - b.number; });
    return result;
};
exports.calculateFollowpos = calculateFollowpos;
