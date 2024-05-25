import { SimulationLinkDatum, SimulationNodeDatum } from 'd3';
import { FollowposResult } from './dfa';

export interface NodeInterface extends SimulationNodeDatum {
    id: number;
    values: number[];
    group: number;
    isFinalState: boolean;
}

export interface LinkInterface
    extends SimulationLinkDatum<SimulationNodeDatum> {
    source: NodeInterface;
    target: NodeInterface;
    transition: string;
}

export const findNodeByTargetValues = (
    target: number[],
    nodes: NodeInterface[]
): NodeInterface => {
    for (const node of nodes) {
        const nodeSet = new Set(node.values);
        if (target.every((val) => nodeSet.has(val))) {
            return node;
        }
    }

    return null;
};

export const getNewNodes = (
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

export const isArrayPresent = (
    target: number[],
    base: NodeInterface[]
): boolean => {
    const stringifiedTarget = JSON.stringify(target.sort());
    return base.some((node) => {
        const stringifiedValues = JSON.stringify(node.values.sort());
        return stringifiedValues === stringifiedTarget;
    });
};

export const generateLink = (source, target, transition) => {
    return { source, target, transition };
};

export const generateNode = (id, values, group, finalState) => {
    return { id, values, group, isFinalState: values.includes(finalState) };
};

export const getNewValues = (
    potentialList: number[],
    followpos: FollowposResult[]
) => {
    let newValues = [];

    potentialList.forEach((id) => {
        const matchedFollowPos = followpos.find((value) => {
            return id === value.number;
        });

        if (matchedFollowPos) {
            newValues.push(...matchedFollowPos.followpos);
        }
    });

    return newValues.filter((item, index) => {
        return newValues.indexOf(item) === index;
    });
};

export const generateNodesAndLinks = (
    firstpos: number[],
    followpos: FollowposResult[]
) => {
    let nodes: NodeInterface[] = [
        { id: 1, values: firstpos, group: 1, isFinalState: false },
    ];
    let links: LinkInterface[] = [];
    let queue: NodeInterface[] = [...nodes];

    const finalState = followpos.find((data) => {
        return data.symbol === '#';
    }).number;

    let deadState = null;

    let nodeCount = 2;

    while (queue.length > 0) {
        const currentNode = queue.shift();

        const currentSymbol = followpos[currentNode.id - 1].symbol;

        const { a, b } = getNewNodes(currentNode, followpos);

        const potentialNewNodes = [];

        if (a.length !== 0) {
            potentialNewNodes.push({
                transition: 'a',
                list: a,
            });
        } else if (currentSymbol !== '#') {
            if (deadState === null) {
                const newDeadState = generateNode(
                    nodeCount,
                    [nodeCount],
                    1,
                    finalState
                );
                nodeCount += 1;
                deadState = newDeadState;
                nodes.push(deadState);
                const deadA = generateLink(deadState, deadState, 'a');
                const deadB = generateLink(deadState, deadState, 'b');
                links.push(deadA, deadB);
            }
            const newLink = generateLink(currentNode, deadState, 'a');
            links.push(newLink);
        }

        if (b.length !== 0) {
            potentialNewNodes.push({
                transition: 'b',
                list: b,
            });
        } else if (currentSymbol !== '#') {
            if (deadState === null) {
                const newDeadState = generateNode(
                    nodeCount,
                    [nodeCount],
                    1,
                    finalState
                );
                nodeCount += 1;
                deadState = newDeadState;
                nodes.push(deadState);
                const deadA = generateLink(deadState, deadState, 'a');
                const deadB = generateLink(deadState, deadState, 'b');
                links.push(deadA, deadB);
            }
            const newLink = generateLink(currentNode, deadState, 'b');
            links.push(newLink);
        }

        console.log('LOG POTENTIAL', currentNode.id, potentialNewNodes);

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
                // const newValues = getNewValues(potential.list, followpos);
                // console.log(newValues);
                const newNode = generateNode(
                    nodeCount,
                    potential.list,
                    1,
                    finalState
                );
                nodeCount += 1;
                nodes.push(newNode);
                queue.push(newNode);
                console.log('LOG LINK TO ADD', currentNode.id, newNode.id);
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
