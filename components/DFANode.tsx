import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

function DFANode(props: NodeProps) {
    const { data, id } = props;
    const label = data.label;
    const active = data.active;

    const isBottomNode = () => {
        return parseInt(id) % 2 == 0;
    };

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
                    ? '0 0 150px 7px #fff, 0 0 10px 5px #0ff, 0 0 25px 12px #0ff'
                    : 'none',
            }}
        >
            <Handle
                id="bidirectionalBottomTarget"
                type="target"
                position={Position.Top}
            />
            <Handle
                id="bidirectionalBottomSource"
                type="source"
                position={Position.Top}
            />

            <Handle
                id="bidirectionalTopTarget"
                type="target"
                position={Position.Bottom}
            />
            <Handle
                id="bidirectionalTopSource"
                type="source"
                position={Position.Bottom}
            />

            <Handle
                id="selfConnectingTarget"
                type="target"
                position={Position.Right}
            />
            <Handle
                id="selfConnectingSource"
                type="source"
                position={Position.Left}
            />
            <div>{label}</div>
        </div>
    );
}

export default DFANode;
