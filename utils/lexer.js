"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    TokenType[TokenType["Symbol"] = 0] = "Symbol";
    TokenType[TokenType["Or"] = 1] = "Or";
    TokenType[TokenType["Kleene"] = 2] = "Kleene";
    TokenType[TokenType["Concat"] = 3] = "Concat";
    TokenType[TokenType["OpenParen"] = 4] = "OpenParen";
    TokenType[TokenType["CloseParen"] = 5] = "CloseParen";
    TokenType[TokenType["EOL"] = 6] = "EOL";
})(TokenType || (exports.TokenType = TokenType = {}));
var token = function (value, type) {
    if (value === void 0) { value = ''; }
    return { value: value, type: type };
};
var isLetter = function (str) {
    return str.length === 1 && str.match(/[a-zA-Z]/i);
};
var tokenize = function (string) {
    var tokens = [];
    var src = string.split('');
    // Build each token until end of string
    while (src.length > 0) {
        if (src[0] == '(') {
            tokens.push(token(src.shift(), TokenType.OpenParen));
        }
        else if (src[0] == ')') {
            tokens.push(token(src.shift(), TokenType.CloseParen));
        }
        else if (src[0] == '|') {
            tokens.push(token(src.shift(), TokenType.Or));
        }
        else if (src[0] == '*') {
            tokens.push(token(src.shift(), TokenType.Kleene));
        }
        else if (src[0] == '.') {
            tokens.push(token(src.shift(), TokenType.Concat));
        }
        else if (isLetter(src[0])) {
            tokens.push(token(src.shift(), TokenType.Symbol));
        }
        else if (src[0] == '#') {
            tokens.push(token(src.shift(), TokenType.EOL));
        }
    }
    return tokens;
};
exports.tokenize = tokenize;
