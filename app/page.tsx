'use client';

import { useState, useRef, useEffect } from 'react';
import { NodeInterface, LinkInterface } from '../interfaces/graph';
import DFA from '../components/DFA';
import SidePanel from '../components/SidePanel';
import LegendPanel from '../components/LegendPanel';

const mobileScreen = 640;

export default function Page() {
    const [nodes, setNodes] = useState<NodeInterface[]>([]);
    const [links, setLinks] = useState<LinkInterface[]>([]);
    const [showSidePanel, setShowSidePanel] = useState<boolean>(true);
    const [showLegendPanel, setShowLegendPanel] = useState<boolean>(true);
    const [regexHeader, setRegexHeader] = useState<string>('');
    const sidePanelRef = useRef<HTMLDivElement>(null);
    const legendPanelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                sidePanelRef.current &&
                !sidePanelRef.current.contains(e.target as Node) &&
                showSidePanel &&
                window.innerWidth < mobileScreen
            ) {
                setShowSidePanel(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    console.log(showLegendPanel);
    return (
        <div className="flex justify-center items-center min-h-screen min-w-screen">
            <div className="flex flex-col items-center w-full h-lvh">
                <div className="relative w-full flex justify-center">
                    <h1 className="absolute translate-y-[100%] text-sky-500 text-xl font-bold z-10">
                        {regexHeader}
                    </h1>
                </div>
                {nodes && links && <DFA nodes={nodes} links={links} />}
                <section ref={sidePanelRef}>
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
                        setRegexHeader={setRegexHeader}
                    />
                </section>
                <section ref={legendPanelRef}>
                    {showLegendPanel ? (
                        <i
                            className="bx bx-exit text-sky-500 absolute z-[100] top-3 right-5 text-3xl cursor-pointer"
                            onClick={() => setShowLegendPanel(false)}
                        ></i>
                    ) : (
                        <i
                            className="bx bx-info-circle text-sky-500 absolute z-[100] right-5 top-3 text-3xl cursor-pointer"
                            onClick={() => setShowLegendPanel(true)}
                        ></i>
                    )}
                    <LegendPanel show={showLegendPanel} />
                </section>
            </div>
        </div>
    );
}
