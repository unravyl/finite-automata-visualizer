'use client';

import React, { useState } from 'react';
import Parser from '../classes/Parser';
import { computeFunctions, calculateFollowpos } from '../utils/dfa';
import DFADiagram from '../components/DFADiagram';
import SidePanel from '../components/SidePanel';

export default function Page() {
    const [regex, setRegex] = useState<string>('');
    const [followPos, setFollowPos] = useState<Map<number, number[]> | null>(
        new Map([
            [1, [1, 2, 3]],
            [2, [1, 2, 3]],
            [3, [4]],
            [4, [5]],
            [5, [6]],
        ])
    );
    const [showSidePanel, setShowSidePanel] = useState<boolean>(true);

    const handleRegexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegex(e.target.value);
    };

    const generateDFA = (inputString: string) => {
        const parser = new Parser();
        const ast = parser.produceAST(inputString);
        computeFunctions(ast.body);
        setFollowPos(calculateFollowpos(ast.body));
    };

    return (
        <div>
            <input
                type="text"
                value={regex}
                onChange={(e) => handleRegexInputChange(e)}
            />
            <button onClick={() => generateDFA(regex)} className="font-bold">
                Generate
            </button>
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
            {followPos && (
                <div>
                    <h2>Nodes:</h2>
                    <ul>
                        {Array.from(followPos).map(([key, values]) => (
                            <li key={key}>
                                {key}: {values.join(', ')}
                            </li>
                        ))}
                    </ul>

                    <DFADiagram followpos={followPos} />
                </div>
            )}
        </div>
    );
}
