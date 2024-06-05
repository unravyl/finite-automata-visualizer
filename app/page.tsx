'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { NodeInterface, LinkInterface } from '../interfaces/graph';
import DFA from '../components/DFA';
import SidePanel from '../components/SidePanel';
import LegendPanel from '../components/LegendPanel';

import Icon from '@mdi/react';
import { mdiRocketLaunchOutline } from '@mdi/js';
import { mdiCloseCircleOutline } from '@mdi/js';
import { mdiCheckCircleOutline } from '@mdi/js';
import { mdiSquare } from '@mdi/js';

const mobileScreen = 640;
const laptopScreen = 1024;

export default function Page() {
    const [nodes, setNodes] = useState<NodeInterface[]>([]);
    const [links, setLinks] = useState<LinkInterface[]>([]);
    const [showSidePanel, setShowSidePanel] = useState<boolean>(false);
    const [showLegendPanel, setShowLegendPanel] = useState<boolean>(false);
    const [regexHeader, setRegexHeader] = useState<string>('');
    const [stringInput, setStringInput] = useState<string>('');
    const [inputMessageIndex, setInputMessageIndex] = useState<number | null>(
        null
    );
    const [blinkSidePanel, setBlinkSidePanel] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [animationSpeed, setAnimationSpeed] = useState<number>(2);

    const sidePanelRef = useRef<HTMLDivElement>(null);
    const legendPanelRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const disableAnimateInput = regexHeader.length === 0;

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

    const isValidStringInput = (input: string) => {
        const regex = /^[a-zA-Z\s]*$/;
        return regex.test(input);
    };

    const disableAnimationButton =
        stringInput.length === 0 || isValidStringInput(stringInput) === false;

    const isValidRegex = (inputString: string): boolean => {
        if (!regexHeader) {
            return false;
        }

        const regexPattern = regexHeader
            .replace(/\./g, '+')
            .replace(/e/g, '')
            .replace(/ /g, '\\s*')
            .replace(/\*\+/g, '*');

        let inputStringProcessed = inputString.replace(/e/g, '');

        let regex = new RegExp(`^${regexPattern}$`);

        return regex.test(inputStringProcessed);
    };

    const pause = (ms: number) => new Promise((res) => setTimeout(res, ms));

    const handleAnimate = async () => {
        if (!isValidStringInput(stringInput)) {
            return;
        }
        setIsAnimating(true);
        const nodesCopy = [...nodes];
        const linksCopy = [...links];
        const delay = 1000 / animationSpeed;
        let currNode = 1;

        for (let i = 0; i < stringInput.length; i++) {
            const tempNodes = nodes.map((node) => {
                if (node.id === currNode) {
                    return {
                        ...node,
                        active: true,
                    };
                }
                return node;
            });
            setNodes(tempNodes);
            await pause(delay);
            setNodes([...nodesCopy]);

            const char = stringInput[i];
            let nextNode = null;
            const tempLinks = links.map((link) => {
                if (
                    link.source.id === currNode &&
                    (link.transition === char || link.transition === 'a,b')
                ) {
                    nextNode = link.target.id;
                    return {
                        ...link,
                        active: true,
                    };
                }
                return link;
            });
            setLinks(tempLinks);
            await pause(delay);
            setLinks([...linksCopy]);

            currNode = nextNode;
        }

        const tempNodes = nodes.map((node) => {
            if (node.id === currNode) {
                return {
                    ...node,
                    active: true,
                };
            }
            return node;
        });
        setNodes(tempNodes);
        await pause(delay);
        setNodes([...nodesCopy]);
        setIsAnimating(false);
    };

    const closeKeyboard = () => {
        inputRef.current.blur();
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
    }, [stringInput, regexHeader]);

    // created
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                sidePanelRef.current &&
                !sidePanelRef.current.contains(e.target as Node) &&
                window.innerWidth < laptopScreen
            ) {
                setShowSidePanel(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setBlinkSidePanel(
                regexHeader.length === 0 && window.innerWidth < laptopScreen
            );
            if (window.innerWidth >= laptopScreen) {
                setShowSidePanel(true);
                setShowLegendPanel(true);
            } else {
                setShowSidePanel(false);
                setShowLegendPanel(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex justify-center items-center min-h-svh min-w-screen">
            <div className="flex flex-col items-center w-full h-svh">
                <div className="relative w-full flex justify-center">
                    <h1 className="absolute top-5 text-sky-500 text-3xl font-bold z-10">
                        {regexHeader}
                    </h1>
                </div>
                {nodes && links && <DFA nodes={nodes} links={links} />}
                <section className="relative w-full flex justify-center">
                    <div className="absolute bottom-3 flex flex-col gap-2 w-[90%] max-w-[750px]">
                        <div className="grow h-[50px] border flex items-stretch gap-3 pl-5 pr-2 py-2 rounded-full bg-gray-50">
                            <input
                                ref={inputRef}
                                onChange={(e) =>
                                    setStringInput(e.target.value.toLowerCase())
                                }
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        closeKeyboard();
                                        handleAnimate();
                                    }
                                }}
                                className="grow min-w-[10px] outline-none bg-gray-50"
                                placeholder={
                                    !disableAnimateInput
                                        ? 'Enter string here'
                                        : 'Please select a regex'
                                }
                                disabled={disableAnimateInput}
                                type="text"
                            />
                            {!isAnimating ? (
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => {
                                            closeKeyboard();
                                            handleAnimate();
                                        }}
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
                                    <button
                                        onClick={() => {
                                            const temp =
                                                (animationSpeed + 1) % 6;
                                            setAnimationSpeed(
                                                temp === 0 ? 1 : temp
                                            );
                                        }}
                                        className="text-xs w-[32px] flex items-center justify-center rounded-full border-2 bg-sky-50 border-sky-500 text-sky-500 px-3"
                                    >
                                        {animationSpeed}X
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        window.location.reload();
                                    }}
                                    className={`flex items-center gap-1 bg-sky-500 text-white px-2 rounded-full`}
                                >
                                    <Icon path={mdiSquare} size={0.6} />
                                    Stop
                                </button>
                            )}
                        </div>
                        <div className="flex px-5 gap-1 h-3 text-yellow-500">
                            {inputMessageIndex !== null && (
                                <div
                                    className={`flex items-center gap-1 text-sm text-${inputMessage[inputMessageIndex].color}-500`}
                                >
                                    <Icon
                                        path={
                                            inputMessage[inputMessageIndex].icon
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
                <section ref={sidePanelRef}>
                    <button
                        className={`text-gray-800 absolute z-20 ml-2 mt-2.5 top-0 left-0 p-1 rounded-md hover:bg-black/[.05] transition duration-200 ${blinkSidePanel ? 'blink' : ''}`}
                        onClick={() => {
                            setShowSidePanel(!showSidePanel);
                            if (blinkSidePanel) {
                                setBlinkSidePanel(false);
                            }
                        }}
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
                    <Suspense>
                        <SidePanel
                            show={showSidePanel}
                            setNodes={setNodes}
                            setLinks={setLinks}
                            setRegexHeader={setRegexHeader}
                        />
                    </Suspense>
                </section>
                <section ref={legendPanelRef}>
                    {showLegendPanel ? (
                        <i
                            className="bx bx-exit text-sky-500 absolute z-[100] top-3 right-2 text-3xl cursor-pointer"
                            onClick={() => setShowLegendPanel(false)}
                        ></i>
                    ) : (
                        <i
                            className="bx bx-info-circle text-sky-500 absolute z-[100] right-2 top-3 text-3xl cursor-pointer"
                            onClick={() => setShowLegendPanel(true)}
                        ></i>
                    )}
                    <LegendPanel show={showLegendPanel} />
                </section>
            </div>
        </div>
    );
}
