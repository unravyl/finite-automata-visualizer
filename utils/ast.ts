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
    operator: string
}

export interface Or extends BinaryExpr {
    kind: "Or"
    operator: string
}

export interface Kleene extends Node {
    kind: "Kleene"
    body: Expr | null
    operator: string
}

export interface Symbol extends Node {
    kind: "Symbol"
    value: any
} 