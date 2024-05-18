import { Concat, Kleene, Node, Or, Symbol } from "../utils/ast";
import { Token, TokenType, tokenize } from "../utils/lexer";

export default class Parser {
    private tokens = [] as Token[]

    private notEOL = () => {
        if (this.tokens[0]) {
            return this.tokens[0].type != TokenType.EOL
        }
    }

    private at = () => {
        if (this.tokens[0]){
            return this.tokens[0] as Token
        }
    }

    private eat = () => {
        const prev = this.tokens.shift() as Token
        return prev
    }

    private expect = (type: TokenType, err: any) => {
        const prev = this.tokens.shift() as Token

        if (!prev || prev.type != type) {
            console.error("Parser Error:\n", err, prev, "Expecting: ", type)
            process.exit()
        }

        return prev
    }

    public produceAST = (str:string) => {
        this.tokens = tokenize(str)

        const tree = {
            body: []
        }
        
        // Parse Until End of Line
        while (this.notEOL()) {
            tree.body.push(this.parseExpr())
        }

        return tree
    }

    private parseExpr = () => {
        return this.parseOrExpr()
    }

    private parseOrExpr = () => {
        let left = this.parseConcatExpr()

        while (this.at() && this.at().value == "|") {
            const operator = this.eat().value
            const right = this.parseConcatExpr()
            left = {
                kind: "Or",
                left,
                right,
                operator
            } as Or
        }

        return left
    }

    private parseConcatExpr = () => {
        let left = this.parsePrimaryExpression()

        while (this.at() && this.at().value == ".") {
            const operator = this.eat().value
            const right = this.parsePrimaryExpression()
            left = {
                kind: "Concat",
                left,
                right,
                operator
            } as Concat
        }

        return left
    }

    private parsePrimaryExpression = () => {
        const tk = this.at().type

        switch (tk) {
            case TokenType.Symbol:
                return { kind: "Symbol", value: this.eat().value} as Symbol
            case TokenType.Concat:
                return { kind: "Concat", operator: this.eat().value} as Concat
            case TokenType.Or:
                return { kind: "Or", operator: this.eat().value} as Or
            case TokenType.Kleene:
                return { kind: "Kleene", operator: this.eat().value} as Kleene
            case TokenType.OpenParen: {
                this.eat()
                const value = this.parseExpr()
                this.expect(TokenType.CloseParen, "Unexpected token found inside parenthesized expression. Expected closing parenthesis.")
                return value
            }
            default:
                console.error("Unexpected token found during parsing!", this.at())
                process.exit()
        }
    }
}