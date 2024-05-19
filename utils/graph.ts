import { FollowposResult } from './dfa';

interface NodeInterface {
    id: number;
    values: number[];
}

interface LinkInterface {
    source: number;
    target: number;
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

const getNewNodes = (
    currentNode: NodeInterface,
    followpos: FollowposResult[]
) => {
    let a = [];
    let b = [];

    currentNode.values.forEach((value) => {
        if (followpos[value - 1].symbol === 'a') {
            if (a.length == 0) {
                a = followpos[value - 1].followpos;
            } else {
                a = [...a, ...followpos[value - 1].followpos];
            }
            a = a.filter((item, index, self) => {
                return self.indexOf(item) === index;
            });
        } else if (followpos[value - 1].symbol === 'b') {
            if (b.length == 0) {
                b = followpos[value - 1].followpos;
            } else {
                b = [...b, ...followpos[value - 1].followpos];
            }
            b = b.filter((item, index, self) => {
                return self.indexOf(item) === index;
            });
        }
    });

    a.sort();
    b.sort();

    return { a, b };
};

export const generateDFA = (
    firstpos: number[],
    followpos: FollowposResult[]
) => {
    let nodes: NodeInterface[] = [{ id: 1, values: firstpos }];
    let links: LinkInterface[] = [];
    let queue: NodeInterface[] = [{ id: 1, values: firstpos }];

    let nodeCount = 2;

    for (
        let currentIndex = 0;
        currentIndex < followpos.length;
        currentIndex++
    ) {
        let currentNode = nodes[currentIndex];

        const { a, b } = getNewNodes(currentNode, followpos);

        nodes.forEach((node) => {
            let createdNewNode = false;
            let newNode = {} as NodeInterface;
            if (!arraysEqual(a, node.values)) {
                createdNewNode = true;
                newNode = { id: nodeCount, values: a };
                nodes.push(newNode);
                // console.log('New Node created from A');
                nodeCount += 1;
                links.push({
                    source: currentNode.id,
                    target: newNode.id,
                    transition: 'a',
                });
            }

            if (!arraysEqual(b, node.values)) {
                if (createdNewNode && !arraysEqual(a, b)) {
                    currentNode = newNode;
                }
                newNode = { id: nodeCount, values: b };
                nodes.push(newNode);
                // console.log('New Node created from B');
                nodeCount += 1;
                links.push({
                    source: currentNode.id,
                    target: newNode.id,
                    transition: 'b',
                });
            }
        });
    }

    // nodes.forEach((node) => {
    //     console.log(node.id, node.values);
    // });

    // links.forEach((link) => {
    //     console.log(link.source, link.target, link.transition);
    // });
};

const sampleFollowPos = [
    { symbol: 'a', followpos: [3, 1, 2], number: 1 },
    { symbol: 'b', followpos: [3, 1, 2], number: 2 },
    { symbol: 'a', followpos: [4], number: 3 },
    { symbol: 'b', followpos: [5], number: 4 },
    { symbol: 'b', followpos: [6], number: 5 },
    { symbol: '#', followpos: [], number: 6 },
];

const sampleFirstPos = [1, 2, 3];

const sampleCurrentNode = { id: 1, values: [1, 2, 3, 6] };

// const { nodes, links } = generateDFA(sampleFollowPos, sampleFirstPos);

const { a, b } = getNewNodes(sampleCurrentNode, sampleFollowPos);

console.log('A', a);
console.log('B', b);
