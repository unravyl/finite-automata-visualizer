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
        return this.tokens[0] as Token
    }

    private eat = () => {
        const prev = this.tokens.shift() as Token
        return prev
    }

    public produceAST = (str:string) => {
        this.tokens = tokenize(str)
        console.log(this.tokens)

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
        return this.parsePrimaryExpression()
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
            default:
                return {} as Node
        }
    }
}