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
    followpos: Map<number, number[]>
) => {
    let nodes: NodeInterface[] = [{ id: 1, values: firstpos }];
    let links: LinkInterface[] = [];

    let nodeCount = 2;

    // followpos.forEach((value, key) => {
    //     let isPresent = false;

    //     nodes.forEach((node) => {
    //         if (arraysEqual(node.values, value)) {
    //             isPresent = true;
    //         }
    //     });

    //     if (isPresent) {
    //         return;
    //     }

    //     nodes.push({ id: nodeCount, values: value });
    //     nodeCount += 1;
    // });

    let currentNode = 0;

    while (true) {}

    nodes.forEach((node) => {
        console.log(node.values);
    });
};

const sampleMap = new Map([
    [1, [1, 2, 3]],
    [2, [1, 2, 3]],
    [3, [4]],
    [4, [5]],
    [5, [6]],
]);

const sampleFirstPos = [1, 2, 3];

generateNodeAndLinks(sampleFirstPos, sampleMap);
