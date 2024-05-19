import { FollowposResult } from './dfa';

interface NodeInterface {
    id: number;
    values: number[];
}

interface LinkInterface {
    source: NodeInterface;
    target: NodeInterface;
    transition: string;
}

const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    a.sort();
    b.sort();

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

export const generateNodeAndLinks = (
    firstpos: number[],
    followpos: FollowposResult[]
) => {
    let nodes: NodeInterface[] = [{ id: 1, values: firstpos }];
    let links: LinkInterface[] = [];

    let nodeCount = 2;

    let currentIndex = 0;

    while (true) {
        const currentNode = nodes[currentIndex];
        currentNode.values.forEach((value) => {});
    }

    nodes.forEach((node) => {
        console.log(node.values);
    });
};

const sampleFollowPos = [
    { symbol: 'a', followpos: [3, 1, 2], number: 1 },
    { symbol: 'b', followpos: [3, 1, 2], number: 2 },
    { symbol: 'a', followpos: [4], number: 3 },
    { symbol: 'b', followpos: [5], number: 4 },
    { symbol: 'b', followpos: [6], number: 5 },
];

const sampleFirstPos = [1, 2, 3];

generateNodeAndLinks(sampleFirstPos, sampleFollowPos);
