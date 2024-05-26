'use client';

import React, { useEffect } from 'react';
import ReactFlow, {
    Background,
    useNodesState,
    Edge,
    Node,
    MarkerType,
    ConnectionMode,
    EdgeTypes,
    NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { NodeInterface, LinkInterface } from '../interfaces/graph';
import SelfConnectingEdge from './SelfConnectingEdge';
import FloatingEdge from './FloatingEdge';
import CircleNode from './CircleNode';

interface PropsInterface {
    nodes: NodeInterface[];
    links: LinkInterface[];
}

const DFA = (props: PropsInterface) => {
    const { nodes, links } = props;

    const nodeTypes: NodeTypes = {
        circle: CircleNode,
    };

    const diagramNodes = nodes.map((node, index) => {
        const label = node.isFinalState
            ? 'F'
            : node.id === 1
              ? 'S'
              : node.id === -1
                ? 'D'
                : node.id.toString();

        return {
            id: node.id.toString(),
            data: {
                label,
            },
            position: { x: index * 200, y: index % 2 === 0 ? 100 : 350 },
            type: 'circle',
        } as Node;
    });

    const edgeTypes: EdgeTypes = {
        selfconnecting: SelfConnectingEdge,
        floating: FloatingEdge,
    };

    const diagramEdges = links.map((link) => {
        const edgeId = `${link.transition}-(${link.source.id})-(${link.target.id})`;
        const isLoop = link.source.id === link.target.id;

        return {
            id: edgeId,
            source: link.source.id.toString(),
            target: link.target.id.toString(),
            label: link.transition,
            type: isLoop ? 'selfconnecting' : 'floating',
            markerEnd: { type: MarkerType.ArrowClosed },
        } as Edge;
    });

    const [nodeState, setNodeState, onNodesChange] =
        useNodesState(diagramNodes);

    useEffect(() => {
        setNodeState(diagramNodes);
    }, [nodes, links]);

    return (
        <div className="h-lvh w-full">
            <ReactFlow
                nodes={nodeState}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                edges={diagramEdges}
                edgeTypes={edgeTypes}
                connectionMode={ConnectionMode.Loose}
                fitView
            >
                <Background />
            </ReactFlow>
        </div>
    );
};

export default DFA;
