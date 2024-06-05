'use client';

import React, { useEffect, useState } from 'react';
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
import DFANode from './DFANode';
import BiDirectionalEdge from './BidirectionalEdge';
import { StateTypes } from '../constants/stateTypes';

interface PropsInterface {
    nodes: NodeInterface[];
    links: LinkInterface[];
}

const nodeTypes: NodeTypes = {
    dfa: DFANode,
};

const edgeTypes: EdgeTypes = {
    selfconnecting: SelfConnectingEdge,
    floating: FloatingEdge,
    bidirectional: BiDirectionalEdge,
};

const DFA = (props: PropsInterface) => {
    const { nodes, links } = props;

    let bidirectionals = [];

    const checkNodeBidirectionality = (node: NodeInterface) => {
        const sources = links.filter((link) => {
            return link.source.id === node.id;
        });

        const targets = links.filter((link) => {
            return link.target.id === node.id;
        });

        if (sources.length === 0 || targets.length === 0) {
            return null;
        }

        let isBirectional = false;

        sources.forEach((sourceLink) => {
            targets.forEach((targetLink) => {
                if (
                    sourceLink.source.id === targetLink.target.id &&
                    sourceLink.target.id === targetLink.source.id &&
                    sourceLink.source.id !== targetLink.source.id &&
                    sourceLink.target.id !== targetLink.target.id
                ) {
                    if (!bidirectionals.includes(sourceLink)) {
                        bidirectionals.push(sourceLink);
                    }
                    if (!bidirectionals.includes(targetLink)) {
                        bidirectionals.push(targetLink);
                    }
                    isBirectional = true;
                }
            });
        });

        return isBirectional;
    };

    const checkLinkBidirectionality = (link: LinkInterface) => {
        if (bidirectionals.includes(link)) {
            return true;
        } else {
            return false;
        }
    };

    const isBottomNode = (id: number) => {
        return id % 2 === 0;
    };

    const diagramNodes = nodes.map((node, index) => {
        const isBidirectional = checkNodeBidirectionality(node);

        const label = node.isFinalState
            ? StateTypes.FINAL
            : node.id === 1
              ? StateTypes.START
              : node.id === -1
                ? StateTypes.DEAD
                : node.id.toString();

        const active = node?.active || false;

        return {
            id: node.id.toString(),
            data: {
                label,
                active,
                isBidirectional,
            },
            position: {
                x: 75 * index + 3.1 ** (index + 1),
                y: index % 2 === 0 ? 100 : 350,
            },
            type: 'dfa',
        } as Node;
    });

    const diagramEdges = links.map((link) => {
        const targetNodeId = link.target.id;
        const sourceNodeId = link.source.id;

        const edgeId = `${link.transition}-(${sourceNodeId})-(${targetNodeId})`;

        const isSourceBottom = isBottomNode(sourceNodeId);
        const isTargetBottom = isBottomNode(targetNodeId);

        const isLoop = sourceNodeId === targetNodeId;
        const isBidirectional = checkLinkBidirectionality(link);

        const active = link?.active || false;

        const edgeType = isLoop
            ? 'selfconnecting'
            : isBidirectional
              ? 'bidirectional'
              : 'floating';

        const sourceHandle = isLoop
            ? 'selfConnectingSource'
            : isBidirectional
              ? !isSourceBottom
                  ? 'bidirectionalBottomSource'
                  : 'bidirectionalTopSource'
              : null;

        const targetHandle = isLoop
            ? 'selfConnectingTarget'
            : isBidirectional
              ? !isTargetBottom
                  ? 'bidirectionalBottomTarget'
                  : 'bidirectionalTopTarget'
              : null;

        return {
            id: edgeId,
            source: sourceNodeId.toString(),
            target: targetNodeId.toString(),
            sourceHandle,
            targetHandle,
            label: link.transition,
            type: edgeType,
            markerEnd: { type: MarkerType.ArrowClosed },
            data: {
                active,
                isBidirectional,
            },
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
