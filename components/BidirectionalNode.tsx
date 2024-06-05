import React, { memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

const style = {
    background: '#fff',
    width: 75,
    height: 75,
    border: '2px solid #ddd',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const BiDirectionalNode = ({ data }: NodeProps) => {
    return (
        <div style={style}>
            <Handle type="source" position={Position.Left} id="left" />
            {data.label}
            <Handle type="source" position={Position.Right} id="right" />
        </div>
    );
};

export default memo(BiDirectionalNode);
