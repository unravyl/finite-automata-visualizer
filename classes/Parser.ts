import { Concat, Kleene, Node, Or, Symbol } from '../utils/ast';
import { Token, TokenType, tokenize } from '../utils/lexer';

export default class Parser {
    private tokens = [] as Token[];
    private idCount = 0;

    private notEOL = () => {
        if (this.tokens[0]) {
            return this.tokens[0].type != TokenType.EOL;
        }
    };

    private at = () => {
        if (this.tokens[0]) {
            return this.tokens[0] as Token;
        }
    };

    private eat = () => {
        const prev = this.tokens.shift() as Token;
        return prev;
    };

    private expect = (type: TokenType, err: any) => {
        const prev = this.tokens.shift() as Token;

        if (!prev || prev.type != type) {
            console.error('Parser Error:\n', err, prev, 'Expecting: ', type);
        }

        return prev;
    };

    public produceAST = (str: string) => {
        let augmentedStr = '('.concat(str);
        augmentedStr = augmentedStr.concat(').#');
        this.tokens = tokenize(augmentedStr);

        const tree = {
            body: null,
        };

        // Parse Until End of Line
        while (this.notEOL()) {
            tree.body = this.parseExpr();
        }

        console.log('LOG AST', tree);

        return tree;
    };

    private parseExpr = () => {
        return this.parseOrExpr();
    };

    private parseOrExpr = () => {
        let left = this.parseConcatExpr();

        while (this.at() && this.at().value == '|') {
            const value = this.eat().value;
            const right = this.parseConcatExpr();
            left = {
                kind: 'Or',
                left,
                right,
                value,
            } as Or;
        }

        return left;
    };

    private parseConcatExpr = () => {
        let left = this.parseKleeneExpr();

        while (this.at() && this.at().value == '.') {
            const value = this.eat().value;
            const right = this.parseKleeneExpr();
            left = {
                kind: 'Concat',
                left,
                right,
                value,
            } as Concat;
        }

        return left;
    };

    private parseKleeneExpr = () => {
        let body = this.parsePrimaryExpression();

        while (this.at() && this.at().value == '*') {
            const value = this.eat().value;
            body = {
                kind: 'Kleene',
                body,
                value,
            } as Kleene;
        }

        return body;
    };

    private parsePrimaryExpression = () => {
        const tk = this.at().type;

        switch (tk) {
            case TokenType.Symbol:
                this.idCount += 1;
                return {
                    kind: 'Symbol',
                    value: this.eat().value,
                    id: this.idCount,
                } as Symbol;
            case TokenType.Concat:
                return { kind: 'Concat', value: this.eat().value } as Concat;
            case TokenType.Or:
                return { kind: 'Or', value: this.eat().value } as Or;
            case TokenType.Kleene:
                return { kind: 'Kleene', value: this.eat().value } as Kleene;
            case TokenType.EOL:
                this.idCount += 1;
                return {
                    kind: 'Symbol',
                    value: this.eat().value,
                    id: this.idCount,
                } as Symbol;
            case TokenType.OpenParen: {
                this.eat();
                const value = this.parseExpr();
                this.expect(
                    TokenType.CloseParen,
                    'Unexpected token found inside parenthesized expression. Expected closing parenthesis.'
                );
                return value;
            }
            default:
                console.error(
                    'Unexpected token found during parsing!',
                    this.at()
                );
        }
    };
}
