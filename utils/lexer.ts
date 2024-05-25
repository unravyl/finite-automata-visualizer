import { TokenType, Token } from '../interfaces/lexer';

const token = (value = '', type: TokenType): Token => {
    return { value, type };
};

const isLetter = (str: string) => {
    return str.length === 1 && str.match(/[a-zA-Z]/i);
};

export const tokenize = (string: string): Token[] => {
    const tokens = [] as Token[];
    const src = string.split('');

    while (src.length > 0) {
        if (src[0] == '(') {
            tokens.push(token(src.shift(), TokenType.OpenParen));
        } else if (src[0] == ')') {
            tokens.push(token(src.shift(), TokenType.CloseParen));
        } else if (src[0] == '|') {
            tokens.push(token(src.shift(), TokenType.Or));
        } else if (src[0] == '*') {
            tokens.push(token(src.shift(), TokenType.Kleene));
        } else if (src[0] == '.') {
            tokens.push(token(src.shift(), TokenType.Concat));
        } else if (isLetter(src[0])) {
            tokens.push(token(src.shift(), TokenType.Symbol));
        } else if (src[0] == '#') {
            tokens.push(token(src.shift(), TokenType.EOL));
        }
    }

    return tokens;
};
