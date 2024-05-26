import {
    AbstractSyntaxTreeInterface,
    FollowPosInterface,
} from '../interfaces/ast';
import { Concat, Kleene, Or, Symbol, Node } from '../interfaces/ast';
import { Token, TokenType } from '../interfaces/lexer';
import { tokenize } from '../utils/lexer';

export default class Parser {
    private tokens = [] as Token[];
    private idCount = 0;
    public firstPos = [] as number[];
    public followPos = [] as FollowPosInterface[];
    public tree = {} as AbstractSyntaxTreeInterface;
    public string = null;

    constructor(str: string) {
        this.string = str;
        const augmentedString = str.replaceAll('+', '|');
        this.produceAST(augmentedString);
    }

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

    private computeASTFunctions = (node = this.tree.body) => {
        switch (node.kind) {
            case 'Symbol':
                node.nullable = false;
                node.firstpos = [node.id!];
                node.lastpos = [node.id!];
                break;
            case 'Concat':
                this.computeASTFunctions(node.left);
                this.computeASTFunctions(node.right);

                node.nullable = node.left.nullable && node.right.nullable;
                node.firstpos = node.left.nullable
                    ? node.left.firstpos.concat(node.right.firstpos)
                    : node.left.firstpos;
                node.lastpos = node.right.nullable
                    ? node.right.lastpos.concat(node.left!.lastpos)
                    : node.right.lastpos;
                break;
            case 'Or':
                this.computeASTFunctions(node.left);
                this.computeASTFunctions(node.right);

                node.nullable = node.left.nullable || node.right.nullable;
                node.firstpos = node.left.firstpos.concat(node.right.firstpos);
                node.lastpos = node.left.lastpos.concat(node.right.lastpos);
                break;
            case 'Kleene':
                this.computeASTFunctions(node.body);

                node.nullable = true;
                node.firstpos = node.body.firstpos;
                node.lastpos = node.body.lastpos;
                break;
        }
    };

    private computeFollowPos = (root = this.tree.body) => {
        const followpos = new Map<number, number[]>();
        const symbolMap = new Map<number, string>();

        const traverse = (node: Node) => {
            symbolMap.set(node.id, node.value);
            switch (node.kind) {
                case 'Concat':
                    for (const i of node.left.lastpos) {
                        addFollowpos(i, node.right.firstpos);
                    }
                    traverse(node.left);
                    traverse(node.right);
                    break;
                case 'Kleene':
                    for (const i of node.lastpos) {
                        addFollowpos(i, node.firstpos);
                    }
                    traverse(node.body);
                    break;
                case 'Or':
                    traverse(node.left);
                    traverse(node.right);
                    break;
                case 'Symbol':
                    break;
            }
        };

        const addFollowpos = (id: number, set: number[]) => {
            if (!followpos.has(id)) {
                followpos.set(id, []);
            }
            followpos.get(id).push(...set);
        };

        traverse(root);

        for (const [id, set] of Array.from(followpos.entries())) {
            followpos.set(id, Array.from(new Set(set)));
        }

        const result: FollowPosInterface[] = [];
        for (const [id, set] of Array.from(followpos.entries())) {
            const symbol = symbolMap.get(id);
            result.push({ symbol, followpos: set, number: id });
        }

        result.sort((a, b) => a.number - b.number);

        result.push({ symbol: '#', followpos: [], number: result.length + 1 });

        return result;
    };

    public produceAST = (str: string) => {
        let augmentedStr = '('.concat(str);
        augmentedStr = augmentedStr.concat(').#');

        this.tokens = tokenize(augmentedStr);

        while (this.notEOL()) {
            this.tree.body = this.parseExpr();
        }

        this.computeASTFunctions();

        this.firstPos = this.tree.body.firstpos;
        this.followPos = this.computeFollowPos();
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
