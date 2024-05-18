export type NodeType  = "Symbol" | "Concat" | "Or" | "Kleene"
export interface Node {
    kind: NodeType
}

export interface Expr extends Node {}

export interface BinaryExpr extends Expr {
    left: Expr | null
    right: Expr | null
    operator: string
}

export interface Concat extends BinaryExpr {
    kind: "Concat"
    operator: "."
}

export interface Or extends BinaryExpr {
    kind: "Or"
    operator: "|"
}

export interface Kleene extends Node {
    kind: "Kleene"
    body: Expr | null
    operator: "*"
}

export interface Symbol extends Node {
    kind: "Symbol"
    value: any
} 