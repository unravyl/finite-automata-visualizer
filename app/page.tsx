'use client';

import React, { useState } from 'react';
import Parser from '../classes/Parser';
import { generateNodesAndLinks } from '../utils/graph';
import { NodeInterface, LinkInterface } from '../interfaces/graph';

import GraphSummary from '../components/GraphSummary';
import SidePanel from '../components/SidePanel';
import ForceDirectedGraph from '../components/FDG';
import { testLog } from '../tests/testLog';

export default function Page() {
    const [regex, setRegex] = useState<string>('');
    const [nodes, setNodes] = useState<NodeInterface[]>([]);
    const [links, setLinks] = useState<LinkInterface[]>([]);
    const [showSidePanel, setShowSidePanel] = useState<boolean>(true);

    const handleRegexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegex(e.target.value);
    };

    const generateDFA = (inputString: string) => {
        const parser = new Parser(inputString);
        const firstPos = parser.firstPos;
        const followPos = parser.followPos;
        const { nodes, links } = generateNodesAndLinks(firstPos, followPos);
        setNodes(nodes);
        setLinks(links);
        testLog(nodes, links);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="p-10 flex flex-col items-center">
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

                {nodes && links && (
                    <GraphSummary nodes={nodes} links={links} />
                    // <ForceDirectedGraph data={{ nodes, links }} />
                )}

                <section>
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
                            stroke="#0ea5e9"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <path d="M9 3v18" />
                        </svg>
                    </button>
                    <SidePanel show={showSidePanel} />
                </section>
            </div>
        </div>
    );
}
