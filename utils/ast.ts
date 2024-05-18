export type NodeType = "Symbol" | "Concat" | "Or" | "Kleene"

export interface Node {
    kind: NodeType
}

export interface Concat extends Node {
    kind: "Concat",
    body: Node[]
}

export interface Or extends Node {
    kind: "Or",
    body: Node[]
}

export interface Kleene extends Node {
    kind: "Kleene"
    body: Node
}

export interface Symbol extends Node {
    kind: "Symbol"
}