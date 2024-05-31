import React from 'react';
import { Handle, Position } from 'reactflow';

function CircleNode(props) {
    const { data } = props;
    const label = data.label;
    const active = data.active;
    return (
        <div
            style={{
                width: 75,
                height: 75,
                border:
                    label === 'F'
                        ? '2px solid green'
                        : label === 'S'
                          ? '2px solid blue'
                          : label === 'D'
                            ? '2px solid red'
                            : '2px solid black',
                backgroundColor:
                    label === 'F'
                        ? '#99EDC3'
                        : label === 'S'
                          ? '#6CA0DC'
                          : label === 'D'
                            ? '#BC544D'
                            : label === 'PTR'
                              ? '#FFFFA7'
                              : '#C5C6D0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: active
                    ? '0 0 150px 7px #fff, 0 0 25px 10px #f0f, 0 0 35px 22px #0ff'
                    : 'none',
            }}
        >
            <Handle type="target" position={Position.Right} />
            <div>{label}</div>
            <Handle type="source" position={Position.Left} />
        </div>
    );
}

export default CircleNode;
