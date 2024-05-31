'use client';

import { useCallback } from 'react';
import {
    useStore,
    getBezierPath,
    EdgeProps,
    EdgeLabelRenderer,
} from 'reactflow';
import { BaseEdge } from 'reactflow';
import { getEdgeParams } from '../utils/reactflow';

function FloatingEdge(props: EdgeProps) {
    const { id, source, target, markerEnd, label, data } = props;
    const active = data?.active || false;

    const sourceNode = useStore(
        useCallback((store) => store.nodeInternals.get(source), [source])
    );
    const targetNode = useStore(
        useCallback((store) => store.nodeInternals.get(target), [target])
    );

    if (!sourceNode || !targetNode) {
        return null;
    }

    const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
        sourceNode,
        targetNode
    );

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX: sx,
        sourceY: sy,
        sourcePosition: sourcePos,
        targetPosition: targetPos,
        targetX: tx,
        targetY: ty,
    });

    return (
        <>
            <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} />
            <EdgeLabelRenderer>
                <p
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        backgroundColor: '#8f94a1',
                        padding: '1px 9px',
                        borderRadius: '50%',
                        boxShadow: active
                            ? '0 0 150px 7px #fff, 0 0 25px 10px #0ff, 0 0 35px 22px #0ff'
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

export default FloatingEdge;
