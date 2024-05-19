'use client';

import React, { useState } from 'react';
import Parser from '../classes/Parser';
import {
    computeFunctions,
    calculateFollowpos,
    FollowposResult,
} from '../utils/dfa';
import {
    LinkInterface,
    NodeInterface,
    generateNodesAndLinks,
} from '../utils/graph';
import GraphSummary from '../components/GraphSummary';

export default function Page() {
    const [regex, setRegex] = useState<string>('');
    const [nodes, setNodes] = useState<NodeInterface[]>([]);
    const [links, setLinks] = useState<LinkInterface[]>([]);

    const handleRegexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegex(e.target.value);
    };

    const generateDFA = (inputString: string) => {
        const parser = new Parser();
        const ast = parser.produceAST(inputString);
        computeFunctions(ast.body);
        const followPos = calculateFollowpos(ast.body);
        const firstPos = ast.body.firstpos;
        const { nodes, links } = generateNodesAndLinks(firstPos, followPos);
        setNodes(nodes);
        setLinks(links);
    };

    return (
        <div className="p-10">
            <div className="flex gap-3">
                <input
                    type="text"
                    value={regex}
                    onChange={(e) => handleRegexInputChange(e)}
                    className="border border-black p-2"
                />
                <button
                    className="border border-black px-2 py-1"
                    onClick={() => generateDFA(regex)}
                >
                    Generate
                </button>
            </div>
            <GraphSummary nodes={nodes} links={links} />
        </div>
    );
}
