import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import { NodeInterface, LinkInterface } from '../utils/graph'; // Replace with your actual data types

interface ForceDirectedGraphProps {
    data: {
        nodes: NodeInterface[];
        links: LinkInterface[];
    };
}

const ForceDirectedGraph: React.FC<ForceDirectedGraphProps> = ({ data }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current || !data) return;

        // D3 Configuration (mostly identical to your provided code)
        const width = 928;
        const height = 600;
        const color = d3.scaleOrdinal(d3.schemeCategory10);
        const links = data.links.map((d) => ({ ...d }));
        const nodes = data.nodes.map((d) => ({ ...d }));

        const simulation = d3
            .forceSimulation(nodes)
            .force(
                'link',
                d3.forceLink(links).id((d) => d.id)
            )
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(width / 2, height / 2));

        // SVG Setup
        const svg = d3
            .select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto;');

        // Links and Nodes
        constlink = svg
            .append('g')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.6)
            .selectAll()
            .data(links)
            .join('line')
            .attr('stroke-width', (d) => Math.sqrt(d.value));

        const node = svg
            .append('g')
            .attr('stroke', '#fff')
            .attr('stroke-width', 1.5)
            .selectAll()
            .data(nodes)
            .join('circle')
            .attr('r', 5)
            .attr('fill', (d) => color(d.group));

        node.append('title').text((d) => d.id);

        // Drag Behavior
        node.call(
            d3
                .drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended)
        );

        // Tick Function
        function ticked() {
            link.attr('x1', (d) => d.source.x)
                .attr('y1', (d) => d.source.y)
                .attr('x2', (d) => d.target.x)
                .attr('y2', (d) => d.target.y);

            node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
        }

        // Drag Functions (same as provided code)
        // ... (dragstarted, dragged, dragended)

        simulation.on('tick', ticked);

        return () => {
            simulation.stop();
        }; // Clean up on unmount
    }, [data]);

    return <svg ref={svgRef} />;
};

export default ForceDirectedGraph;
