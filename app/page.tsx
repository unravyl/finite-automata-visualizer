'use client';

import React, { useState } from 'react';
import { NodeInterface, LinkInterface } from '../interfaces/graph';
import DFA from '../components/DFA';
import SidePanel from '../components/SidePanel';

export default function Page() {
    const [nodes, setNodes] = useState<NodeInterface[]>([]);
    const [links, setLinks] = useState<LinkInterface[]>([]);
    const [showSidePanel, setShowSidePanel] = useState<boolean>(true);

    return (
        <div className="flex justify-center items-center min-h-screen min-w-screen">
            <div className="flex flex-col items-center w-full h-full">
                {nodes && links && <DFA nodes={nodes} links={links} />}
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
                    <SidePanel
                        show={showSidePanel}
                        setNodes={setNodes}
                        setLinks={setLinks}
                    />
                </section>
            </div>
        </div>
    );
}
