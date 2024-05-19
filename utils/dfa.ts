import { Node } from './ast';

export const computeFunctions = (node: Node) => {
    switch (node.kind) {
        case 'Symbol':
            node.nullable = false;
            node.firstpos = [node.id!];
            node.lastpos = [node.id!];
            break;
        case 'Concat':
            computeFunctions(node.left!);
            computeFunctions(node.right!);

            node.nullable = node.left!.nullable && node.right!.nullable;
            node.firstpos = node.left!.nullable
                ? node.left!.firstpos.concat(node.right!.firstpos)
                : node.left!.firstpos;
            node.lastpos = node.right!.nullable
                ? node.right!.lastpos.concat(node.left!.lastpos)
                : node.right!.lastpos;
            break;
        case 'Or':
            computeFunctions(node.left!);
            computeFunctions(node.right!);

            node.nullable = node.left!.nullable || node.right!.nullable;
            node.firstpos = node.left!.firstpos.concat(node.right!.firstpos);
            node.lastpos = node.left!.lastpos.concat(node.right!.lastpos);
            break;
        case 'Kleene':
            computeFunctions(node.body!);

            node.nullable = true;
            node.firstpos = node.body!.firstpos;
            node.lastpos = node.body!.lastpos;
            break;
    }
};

export interface FollowposResult {
    symbol: string;
    followpos: number[];
    number: number;
}

export const calculateFollowpos = (root: Node): FollowposResult[] => {
    const followpos = new Map<number, number[]>();
    const symbolMap = new Map<number, string>();

    const traverse = (node: Node) => {
        symbolMap.set(node.id, node.value);
        switch (node.kind) {
            case 'Concat':
                // Rule 1: If A.B then lastpos(A) is in followpos(B)
                for (const i of node.left.lastpos) {
                    addFollowpos(i, node.right.firstpos);
                }
                traverse(node.left);
                traverse(node.right);
                break;
            case 'Kleene':
                // Rule 2: If A* then lastpos(A) is in followpos(A)
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
                // Terminals don't have followpos
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

    // Remove duplicates from followpos sets
    for (const [id, set] of Array.from(followpos.entries())) {
        followpos.set(id, Array.from(new Set(set)));
    }

    const result: FollowposResult[] = [];
    for (const [id, set] of Array.from(followpos.entries())) {
        const symbol = symbolMap.get(id);
        result.push({ symbol, followpos: set, number: id }); // Add number field
    }

    result.sort((a, b) => a.number - b.number);

    result.push({ symbol: '#', followpos: [], number: result.length });

    return result;
};
