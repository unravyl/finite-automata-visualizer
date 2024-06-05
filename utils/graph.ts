import { NodeInterface, LinkInterface } from '../interfaces/graph';
import { FollowPosInterface } from '../interfaces/ast';
import { Transition } from '../constants/transitions';

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
    followpos: FollowPosInterface[]
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

export const generateLink = (
    source: NodeInterface,
    target: NodeInterface,
    transition: string
) => {
    return { source, target, transition };
};

export const generateNode = (
    id: number,
    values: number[],
    group: number,
    finalState: number
) => {
    return { id, values, group, isFinalState: values.includes(finalState) };
};

export const getNewValues = (
    potentialList: number[],
    followpos: FollowPosInterface[]
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

const checkDuplicateLink = (
    links: LinkInterface[],
    source: NodeInterface,
    target: NodeInterface
) => {
    const sourceId = source.id;
    const targetId = target.id;

    const duplicates = links.map((link, index) => {
        const existingSourceId = link.source.id;
        const existingTargetId = link.target.id;
        if (sourceId === existingSourceId && targetId === existingTargetId) {
            return index;
        } else {
            return;
        }
    });

    const filteredDuplicates = duplicates.filter(
        (element) => element !== undefined
    );

    if (filteredDuplicates.length === 0) {
        return null;
    } else {
        return filteredDuplicates;
    }
};

export const generateNodesAndLinks = (
    firstpos: number[],
    followpos: FollowPosInterface[]
) => {
    const finalState = followpos.find((data) => {
        return data.symbol === '#';
    }).number;

    let nodes: NodeInterface[] = [
        { id: 1, values: firstpos, group: 1, isFinalState: false },
    ];

    if (nodes[0].values.includes(finalState)) {
        nodes[0].isFinalState = true;
    }

    let links: LinkInterface[] = [];
    let queue: NodeInterface[] = [...nodes];

    let deadState = null;

    let nodeCount = 2;

    const generateDeadState = () => {
        const deadStateId = -1;
        const newDeadState = generateNode(deadStateId, [], 1, finalState);
        deadState = newDeadState;
        nodes.push(deadState);
        const dead = generateLink(deadState, deadState, Transition.AB);
        links.push(dead);
    };

    while (queue.length > 0) {
        const currentNode = queue.shift();

        const currentSymbol = followpos[currentNode.id - 1].symbol;

        const { a, b } = getNewNodes(currentNode, followpos);

        const potentialNewNodes = [];

        if (a.length !== 0) {
            potentialNewNodes.push({
                transition: Transition.A,
                list: a,
            });
        } else if (currentSymbol !== '#') {
            if (deadState === null) {
                generateDeadState();
            }
            const newLink = generateLink(currentNode, deadState, Transition.A);
            links.push(newLink);
        }

        if (b.length !== 0) {
            potentialNewNodes.push({
                transition: Transition.B,
                list: b,
            });
        } else if (currentSymbol !== '#') {
            if (deadState === null) {
                generateDeadState();
            }
            const newLink = generateLink(currentNode, deadState, Transition.B);
            links.push(newLink);
        }

        potentialNewNodes.forEach((potential) => {
            if (isArrayPresent(potential.list, nodes)) {
                const targetNode = findNodeByTargetValues(
                    potential.list,
                    nodes
                );

                const duplicates = checkDuplicateLink(
                    links,
                    currentNode,
                    targetNode
                );

                if (duplicates !== null) {
                    duplicates.forEach((duplicateIndex) => {
                        const newTransition = `${potential.transition},${links[duplicateIndex].transition}`;
                        links[duplicateIndex].transition = newTransition;
                    });
                } else {
                    const newLink = generateLink(
                        currentNode,
                        targetNode,
                        potential.transition
                    );
                    links.push(newLink);
                }
            } else {
                const newNode = generateNode(
                    nodeCount,
                    potential.list,
                    1,
                    finalState
                );

                nodeCount += 1;
                nodes.push(newNode);
                queue.push(newNode);

                const duplicates = checkDuplicateLink(
                    links,
                    currentNode,
                    newNode
                );

                if (duplicates !== null) {
                    duplicates.forEach((duplicateIndex) => {
                        const newTransition = `${potential.transition},${links[duplicateIndex].transition}`;
                        links[duplicateIndex].transition = newTransition;
                    });
                } else {
                    const newLink = generateLink(
                        currentNode,
                        newNode,
                        potential.transition
                    );
                    links.push(newLink);
                }
            }
        });
    }

    // Find final state

    let finalStateNode = {} as NodeInterface;

    nodes.forEach((node) => {
        if (node.isFinalState) {
            finalStateNode = node;
        }
    });

    let finalEdgesState = Transition.NONE as Transition;

    links.forEach((link) => {
        if (link.source === finalStateNode) {
            if (link.transition === Transition.A) {
                if (finalEdgesState === Transition.B) {
                    finalEdgesState = Transition.AB;
                    return;
                }
                finalEdgesState = Transition.A;
            } else if (link.transition === Transition.B) {
                if (finalEdgesState === Transition.A) {
                    finalEdgesState = Transition.AB;
                }
                finalEdgesState = Transition.B;
            } else if (
                link.transition === Transition.AB ||
                link.transition === Transition.BA
            ) {
                finalEdgesState = Transition.AB;
            }
        }
    });

    if (finalEdgesState !== Transition.AB) {
        if (deadState === null) {
            generateDeadState();
        }
    }

    let newLink = null;

    if (finalEdgesState === Transition.A) {
        newLink = generateLink(finalStateNode, deadState, Transition.B);
    } else if (finalEdgesState === Transition.B) {
        newLink = generateLink(finalStateNode, deadState, Transition.A);
    } else if (finalEdgesState === Transition.NONE) {
        newLink = generateLink(finalStateNode, deadState, Transition.AB);
    }

    if (newLink !== null) {
        links.push(newLink);
    }

    return { nodes, links };
};
