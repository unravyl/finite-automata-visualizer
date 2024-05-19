import { FollowposResult } from './dfa';

export interface NodeInterface {
    id: number;
    values: number[];
}

export interface LinkInterface {
    source: number;
    target: number;
    transition: string;
}

const findIdByTargetValues = (
    target: number[],
    nodes: NodeInterface[]
): number | null => {
    const targetSet = new Set(target);

    for (const node of nodes) {
        const nodeSet = new Set(node.values);
        if (target.every((val) => nodeSet.has(val))) {
            return node.id;
        }
    }

    return null;
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

const isArrayPresent = (target: number[], base: NodeInterface[]): boolean => {
    const stringifiedTarget = JSON.stringify(target.sort());
    return base.some((node) => {
        const stringifiedValues = JSON.stringify(node.values.sort());
        return stringifiedValues === stringifiedTarget;
    });
};

const generateLink = (source, target, transition) => {
    return { source, target, transition };
};

const generateNode = (id, values) => {
    return { id, values };
};

export const generateNodesAndLinks = (
    firstpos: number[],
    followpos: FollowposResult[]
) => {
    let nodes: NodeInterface[] = [{ id: 1, values: firstpos }];
    let links: LinkInterface[] = [];
    let queue: NodeInterface[] = [{ id: 1, values: firstpos }];

    let nodeCount = 2;

    while (queue.length > 0) {
        const currentNode = queue.pop();

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
                const targetId = findIdByTargetValues(potential.list, nodes);
                const newLink = generateLink(
                    currentNode.id,
                    targetId,
                    potential.transition
                );
                links.push(newLink);
            } else {
                const newNode = generateNode(nodeCount, potential.list);
                nodeCount += 1;
                nodes.push(newNode);
                queue.push(newNode);
                const newLink = generateLink(
                    currentNode.id,
                    newNode.id,
                    potential.transition
                );
                links.push(newLink);
            }
        });
    }

    return { nodes, links };
};
