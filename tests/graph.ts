import { getNewValues } from '../utils/graph';
import { FollowPosInterface } from '../interfaces/ast';
import {
    getNewNodes,
    isArrayPresent,
    findNodeByTargetValues,
    generateLink,
    generateNode,
} from '../utils/graph';
import { NodeInterface, LinkInterface } from '../interfaces/graph';

const firstpos = [1, 3];
// const potentialList = [2, 3];
const followpos = [
    {
        number: 1,
        symbol: 'a',
        followpos: [2],
    },
    {
        number: 2,
        symbol: 'a',
        followpos: [5],
    },
    {
        number: 3,
        symbol: 'b',
        followpos: [4],
    },
    {
        number: 4,
        symbol: 'b',
        followpos: [5],
    },
    {
        number: 5,
        symbol: '#',
        followpos: [],
    },
];

const nodes: NodeInterface[] = [
    {
        id: 1,
        values: [1, 3],
        group: 1,
        isFinalState: false,
    },
    {
        id: 2,
        values: [5],
        group: 1,
        isFinalState: false,
    },
    {
        id: 3,
        values: [5],
        group: 1,
        isFinalState: false,
    },
    {
        id: 4,
        values: [],
        group: 1,
        isFinalState: true,
    },
];

const target = [5];

const generateNodesAndLinks = (
    firstpos: number[],
    followpos: FollowPosInterface[]
) => {
    let nodes: NodeInterface[] = [
        { id: 1, values: firstpos, group: 1, isFinalState: false },
    ];
    let links: LinkInterface[] = [];
    let queue: NodeInterface[] = [...nodes];

    const finalState = followpos.find((data) => {
        return data.symbol === '#';
    }).number;

    let nodeCount = 2;

    while (queue.length > 0) {
        const currentNode = queue.shift();

        const { a, b } = getNewNodes(currentNode, followpos);

        const potentialNewNodes = [
            {
                transition: 'a',
                list: a,
            },
            {
                transition: 'b',
                list: b,
            },
        ];

        potentialNewNodes.forEach((potential) => {
            if (isArrayPresent(potential.list, nodes)) {
                const targetNode = findNodeByTargetValues(
                    potential.list,
                    nodes
                );
                const newLink = generateLink(
                    currentNode,
                    targetNode,
                    potential.transition
                );
                links.push(newLink);
            } else {
                const newValues = getNewValues(potential.list, followpos);
                const newNode = generateNode(
                    nodeCount,
                    newValues,
                    1,
                    finalState
                );
                nodeCount += 1;
                nodes.push(newNode);
                queue.push(newNode);
                const newLink = generateLink(
                    currentNode,
                    newNode,
                    potential.transition
                );
                links.push(newLink);
            }
        });
    }

    return { nodes, links };
};

// generateNodesAndLinks(firstpos, followpos);
