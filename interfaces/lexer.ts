export enum TokenType {
    Symbol,
    Or,
    Kleene,
    Concat,
    OpenParen,
    CloseParen,
    EOL,
}

export interface Token {
    value: string;
    type: TokenType;
}
