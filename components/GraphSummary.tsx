import React from 'react';
import { LinkInterface, NodeInterface } from '../utils/graph';
import ReactFlow, { MarkerType } from 'react-flow-renderer';

interface PropsInterface {
  nodes: NodeInterface[];
  links: LinkInterface[];
}

const GraphSummary = (props: PropsInterface) => {
  const { nodes, links } = props;
  const validLinks = Array.isArray(links) ? links : [links];

  const nodeIds = nodes.map(node => node.id);

  const Nodes = Array.isArray(nodeIds)
    ? nodeIds.map((id, index) => ({
      id: id.toString(),
      type: 'default',
      data: { label: `State ${index + 1}` },
      position: { x: index * 200, y: 100 },
    }))
    : [];

  const edges = validLinks.map((link, index) => ({
    id: `e${link.source}-${link.target}`,
    source: link.source.toString(),
    target: link.target.toString(),
    animated: true,
    label: link.transition.toString(),
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
  }));

  return (
    <div className="flex flex-col my-5 gap-5">
      <div className='w-[1000px] h-[500px] '>
        <ReactFlow nodes={Nodes} edges={edges}>
        </ReactFlow>
        <style jsx global>{`
        .react-flow__edge-text {
          font-size: 15px !important;
          font-weight: bold;
        }
      `}</style>
      </div>
    </div>
  );
};

export default GraphSummary;
