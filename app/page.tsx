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
import SidePanel from '../components/SidePanel';

export default function Page() {
    const [regex, setRegex] = useState<string>('');
    const [nodes, setNodes] = useState<NodeInterface[]>([]);
    const [links, setLinks] = useState<LinkInterface[]>([]);
    const [showSidePanel, setShowSidePanel] = useState<boolean>(true);

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
            <button
                className="text-gray-800 absolute z-20 ml-2 mt-2.5 top-0 left-0 p-1 rounded-md hover:bg-black/[.05] transition duration-200"
                onClick={() => setShowSidePanel(!showSidePanel)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6B7280"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M9 3v18" />
                </svg>
            </button>
            <SidePanel show={showSidePanel} />
        </div>
    );
}
