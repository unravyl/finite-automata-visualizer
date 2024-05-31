'use client';

import { useState, useRef, useEffect } from 'react';
import { NodeInterface, LinkInterface } from '../interfaces/graph';
import DFA from '../components/DFA';
import SidePanel from '../components/SidePanel';
import LegendPanel from '../components/LegendPanel';

import Icon from '@mdi/react';
import { mdiRocketLaunchOutline } from '@mdi/js';
import { mdiCloseCircleOutline } from '@mdi/js';
import { mdiCheckCircleOutline } from '@mdi/js';

const mobileScreen = 640;

export default function Page() {
    const [nodes, setNodes] = useState<NodeInterface[]>([]);
    const [links, setLinks] = useState<LinkInterface[]>([]);
    const [showSidePanel, setShowSidePanel] = useState<boolean>(true);
    const [showLegendPanel, setShowLegendPanel] = useState<boolean>(false);
    const [showAnimatePanel, setShowAnimatePanel] = useState<boolean>(false);
    const [regexHeader, setRegexHeader] = useState<string>('');
    const [stringInput, setStringInput] = useState<string>('');
    const [inputMessageIndex, setInputMessageIndex] = useState<number | null>(
        null
    );

    const sidePanelRef = useRef<HTMLDivElement>(null);
    const legendPanelRef = useRef<HTMLDivElement>(null);

    // computed

    const disableAnimateInput = regexHeader.length === 0;
    const disableAnimationButton = stringInput.length === 0;

    const inputMessage = [
        {
            message: 'Only alphabetic characters are allowed.',
            icon: mdiCloseCircleOutline,
            color: 'red',
        },
        {
            message: `String is valid for ${regexHeader}`,
            icon: mdiCheckCircleOutline,
            color: 'green',
        },
        {
            message: `String is not valid for ${regexHeader}`,
            icon: mdiCloseCircleOutline,
            color: 'yellow',
        },
    ];

    // functions
    const isValidStringInput = (input: string) => {
        const regex = /^[a-zA-Z\s]*$/;
        return regex.test(input);
    };

    const isValidRegex = (inputString: string): boolean => {
        if (!regexHeader) {
            return;
        }
        const regexPattern = regexHeader
            .replace(/\./g, '+')
            .replace(/e/g, '')
            .replace(/ /g, '\\s*');

        const inputStringProcessed = inputString.replace(/e/g, '');

        const regex = new RegExp(`^${regexPattern}$`);

        return regex.test(inputStringProcessed);
    };

    // watchers
    useEffect(() => {
        setInputMessageIndex(null);
        if (stringInput.length === 0) {
            return;
        }
        if (!isValidStringInput(stringInput)) {
            setInputMessageIndex(0);
            return;
        }
        if (isValidRegex(stringInput)) {
            setInputMessageIndex(1);
        } else {
            setInputMessageIndex(2);
        }
    }, [stringInput]);

    // created

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
                    <h1 className="absolute top-5 text-sky-500 text-xl font-bold z-10">
                        {regexHeader}
                    </h1>
                </div>
                {nodes && links && <DFA nodes={nodes} links={links} />}
                {showAnimatePanel && (
                    <section className="relative w-full flex justify-center">
                        <div className="absolute bottom-3 flex flex-col gap-2 w-[90%] max-w-[750px]">
                            <div className="h-[50px] border flex items-stretch gap-3 pl-5 pr-2 py-2 rounded-full bg-gray-50">
                                <input
                                    onChange={(e) =>
                                        setStringInput(e.target.value)
                                    }
                                    className="grow min-w-[150px] outline-none bg-gray-50"
                                    placeholder={
                                        !disableAnimateInput
                                            ? 'Enter string here'
                                            : 'Please select a regex'
                                    }
                                    disabled={disableAnimateInput}
                                    type="text"
                                />
                                <button
                                    className={`flex items-center gap-1 bg-sky-500 text-white px-2 rounded-full ${disableAnimateInput || disableAnimationButton ? 'cursor-not-allowed' : ''}`}
                                    disabled={
                                        disableAnimateInput ||
                                        disableAnimationButton
                                    }
                                >
                                    <Icon
                                        path={mdiRocketLaunchOutline}
                                        size={1}
                                    />
                                    Animate
                                </button>
                            </div>
                            <div className="flex justify-center gap-1 h-3">
                                {inputMessageIndex !== null && (
                                    <div
                                        className={`flex items-center gap-1 text-sm text-${inputMessage[inputMessageIndex].color}-500`}
                                    >
                                        <Icon
                                            path={
                                                inputMessage[inputMessageIndex]
                                                    .icon
                                            }
                                            size={0.6}
                                        />
                                        <p>
                                            {
                                                inputMessage[inputMessageIndex]
                                                    .message
                                            }
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}
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
                        setShowAnimatePanel={setShowAnimatePanel}
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
