import React from 'react';
import ReactFlow, { Background } from 'reactflow';
import 'reactflow/dist/style.css';

import { NodeInterface, LinkInterface } from '../interfaces/graph';

interface PropsInterface {
    nodes: NodeInterface[];
    links: LinkInterface[];
}

const DFA = (props: PropsInterface) => {
    const { nodes, links } = props;

    const diagramNodes = nodes.map((node, index) => {
        const label = node.isFinalState
            ? 'Final'
            : node.id === 1
              ? 'Start'
              : node.id === -1
                ? 'Dead'
                : `State ${node.id}`;

        return {
            id: node.id.toString(),
            data: {
                label,
            },
            position: { x: index * 200, y: index % 2 === 0 ? 100 : 300 },
        };
    });

    return (
        <div className="h-lvh w-full">
            <ReactFlow nodes={diagramNodes} fitView>
                <Background />
            </ReactFlow>
        </div>
    );
};

export default DFA;
