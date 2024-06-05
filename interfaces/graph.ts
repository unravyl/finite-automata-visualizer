export interface NodeInterface {
    id: number;
    values: number[];
    group: number;
    isFinalState: boolean;
    active?: boolean; // for highlighting (optional)
}

export interface LinkInterface {
    source: NodeInterface;
    target: NodeInterface;
    transition: string;
    active?: boolean;
}
