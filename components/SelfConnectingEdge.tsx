import React from 'react';
import { BaseEdge, EdgeLabelRenderer, EdgeProps } from 'reactflow';
import FloatingEdge from './FloatingEdge';

export default function SelfConnecting(props: EdgeProps) {
    if (props.source !== props.target) {
        return <FloatingEdge {...props} />;
    }

    const { sourceX, sourceY, targetX, targetY, id, markerEnd, label, data } =
        props;
    const active = data?.active || false;
    const radiusX = (sourceX - targetX) * 0.6;
    const radiusY = 50;
    const edgePath = `M ${sourceX} ${sourceY} A ${radiusX} ${radiusY} 0 1 0 ${targetX} ${targetY}`;

    return (
        <>
            <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} />
            <EdgeLabelRenderer>
                <p
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${(sourceX + targetX) / 2}px,${sourceY + 75}px)`,
                        backgroundColor: '#8f94a1',
                        padding: '5px 6px',
                        borderRadius: '50%',
                        boxShadow: active
                            ? '0 0 150px 7px #fff, 0 0 10px 5px #0ff, 0 0 25px 12px #0ff'
                            : 'none',
                    }}
                    className="nodrag nopan"
                >
                    {label}
                </p>
            </EdgeLabelRenderer>
        </>
    );
}
