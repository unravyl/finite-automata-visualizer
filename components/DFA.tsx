'use client';

import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    Edge,
    Node,
    NodeChange,
    EdgeChange,
} from 'reactflow';
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
        } as Node;
    });

    const diagramEdges = links.map((link) => {
        const edgeId = `${link.transition}-(${link.source.id})-(${link.target.id})`;
        return {
            id: edgeId,
            source: link.source.id.toString(),
            target: link.target.id.toString(),
            label: link.transition,
        } as Edge;
    });

    console.log(diagramNodes);
    console.log(diagramEdges);

    const [nodeState, setNodeState] = useState(diagramNodes);
    const [edgeState, setEdgeState] = useState(diagramEdges);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) =>
            setNodeState((nds) => applyNodeChanges(changes, nds)),
        []
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) =>
            setEdgeState((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    return (
        <div className="h-lvh w-full">
            <ReactFlow
                nodes={nodeState}
                onNodesChange={onNodesChange}
                edges={edgeState}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <Background />
            </ReactFlow>
        </div>
    );
};

export default DFA;
