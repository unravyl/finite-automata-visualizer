import React from 'react';
import { LinkInterface, NodeInterface } from '../utils/graph';
import ReactFlow, { MarkerType } from 'react-flow-renderer';
import CustomNode from './CustomNode';

interface PropsInterface {
    nodes: NodeInterface[];
    links: LinkInterface[];
}

const getConnectionPoint = (index: number, type: 'source' | 'target') => {
    if (type === 'source') {
        return index % 2 === 0 ? 'bottom-source' : 'top-source';
    }

    return index % 2 === 0 ? 'left-target' : 'right-target';
};

const GraphSummary = (props: PropsInterface) => {
    const { nodes, links } = props;
    const validLinks = Array.isArray(links) ? links : [links];

    const nodeIds = nodes.map((node) => node.id);

    const Nodes = Array.isArray(nodeIds)
        ? nodeIds.map((id, index) => ({
              id: id.toString(),
              type: 'custom',
              data: { label: `State ${index + 1}` },
              position: { x: index * 200, y: index % 2 === 0 ? 100 : 300 },
          }))
        : [];

    const edges = validLinks.map((link, index) => {
        const sourcePoint = getConnectionPoint(index, 'source');
        const targetPoint = getConnectionPoint(index, 'target');
        const isVerticalEdge =
            sourcePoint.includes('top') || sourcePoint.includes('bottom');

        const labelPosition = isVerticalEdge ? '0%' : '50%';

        return {
            id: `e${link.source.id}-${link.target.id}`,
            source: link.source.id.toString(),
            target: link.target.id.toString(),
            sourceHandle: sourcePoint,
            targetHandle: targetPoint,
            type: 'bezier',
            animated: true,
            label: link.transition.toString(),
            labelPosition: labelPosition,
            markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: '#000000',
            },
            style: {
                strokeWidth: 2,
                stroke: '#000000',
            },
            labelStyle: {
                fontSize: 15,
                fontWeight: 'bold',
                background: 'white',
                padding: '2px',
                borderRadius: '4px',
            },
            labelBgStyle: {
                fill: 'white',
                fillOpacity: 0.85,
                strokeWidth: 0,
            },
        };
    });

    return (
        <div className="flex flex-col my-5 gap-5">
            <div className="w-[1000px] h-[500px] ">
                <ReactFlow
                    nodes={Nodes}
                    edges={edges}
                    nodeTypes={{ custom: CustomNode }}
                />
                <style jsx global>{`
                    .react-flow__edge-text {
                        font-size: 15px !important;
                        font-weight: bold;
                        background: white !important;
                        padding: 2px !important;
                        border-radius: 4px !important;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default GraphSummary;
