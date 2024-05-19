"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNodeAndLinks = void 0;
var arraysEqual = function (a, b) {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (a.length !== b.length)
        return false;
    a.sort();
    b.sort();
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
};
var generateNodeAndLinks = function (followpos) {
    var nodes = [];
    var links = [];
    var nodeCount = 1;
    followpos.forEach(function (value, key) {
        if (!nodes.length) {
            var newNode = {
                id: nodeCount,
                values: value,
            };
            nodeCount += 1;
            nodes.push(newNode);
            return;
        }
        var isPresent = false;
        nodes.forEach(function (node) {
            if (arraysEqual(node.values, value)) {
                isPresent = true;
            }
        });
        if (isPresent) {
            return;
        }
        nodes.push({ id: nodeCount, values: value });
        nodeCount += 1;
    });
    nodes.forEach(function (node) {
        console.log(node.values);
    });
};
exports.generateNodeAndLinks = generateNodeAndLinks;
var sampleMap = new Map([
    [1, [1, 2, 3]],
    [2, [1, 2, 3]],
    [3, [4]],
    [4, [5]],
    [5, [6]],
]);
(0, exports.generateNodeAndLinks)(sampleMap);
