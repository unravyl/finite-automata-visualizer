"use client";
import { useState, useEffect } from 'react';
import ReactFlow, { Controls, Background, useEdgesState, useNodesState, addEdge, MiniMap } from 'react-flow-renderer';

function DFAFlowChart({ followpos }) {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  useEffect(() => {
    if (!followpos || followpos.size === 0) return;

    const nodeData = {}; // Use an object for efficient node lookups
    const newEdges = [];

    for (const [state, transitions] of followpos) {
      nodeData[state] = true; // Mark state as existing
      for (const next of transitions) {
        nodeData[next] = true;
        newEdges.push({
          id: `${state}-${next}`,
          source: state,
          target: next,
          label: next,
          type: 'smoothstep', // Add smooth curves to edges (optional)
          animated: true, // Add animation to edges (optional)
        });
      }
    }

    const newNodes = Object.keys(nodeData).map(state => {
      const isInitial = state === '1';
      const isFinal = !followpos.has(state);
      return {
        id: state,
        data: { label: state },
        type: isFinal ? 'output' : 'input', // 'input' for default, 'output' for final
        position: { x: 100 * parseInt(state), y: isFinal ? 200 : 100 },
        style: isInitial ? { borderColor: 'green' } : {},
      };
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [followpos]);

  return (
    <div style={{ height: 500 }}>
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        fitView
      >
        <Controls />
        <Background />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default DFAFlowChart;
