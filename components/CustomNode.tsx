import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const CustomNode = ({ data }: any) => {
  return (
    <div style={{
      borderRadius: '50%',
      width: '70px', // Increased width to make the node bigger
      height: '70px', // Increased height to make the node bigger
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: '#eee',
      border: '1px solid #ddd',
      position: 'relative'
    }}>
      {data.label}
      <Handle type="source" position={Position.Top} id="top-source" style={{ borderRadius: 0 }} />
      <Handle type="source" position={Position.Bottom} id="bottom-source" style={{ borderRadius: 0 }} />
      <Handle type="source" position={Position.Left} id="left-source" style={{ borderRadius: 0 }} />
      <Handle type="source" position={Position.Right} id="right-source" style={{ borderRadius: 0 }} />
      <Handle type="target" position={Position.Top} id="top-target" style={{ borderRadius: 0 }} />
      <Handle type="target" position={Position.Bottom} id="bottom-target" style={{ borderRadius: 0 }} />
      <Handle type="target" position={Position.Left} id="left-target" style={{ borderRadius: 0 }} />
      <Handle type="target" position={Position.Right} id="right-target" style={{ borderRadius: 0 }} />
    </div>
  );
};

export default CustomNode;
