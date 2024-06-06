'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface PropsInterface {
    close: () => void;
    runDemo: () => void;
}

function WelcomeModal(props: PropsInterface) {
    const { close, runDemo } = props;
    const modalRef = useRef<HTMLDivElement>(null);

    const toggleNeverShow = () => {
        const key = 'show_welcome';
        const value = JSON.parse(localStorage.getItem(key) || 'true');
        localStorage.setItem(key, JSON.stringify(!value));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                close();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    });

    return (
        <div className="absolute w-screen h-full bg-black/60 z-[99999]">
            <div
                ref={modalRef}
                className="absolute bg-white min-w-[350px] max-w-[400px] h-max px-8 py-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 rounded-md shadow-lg"
            >
                <div className="flex items-center gap-3 justify-center">
                    <Image
                        src="/images/logo.svg"
                        width={45}
                        height={45}
                        alt=""
                    />
                    <h1 className="text-3xl text-sky-500 font-bold">
                        Welcome to FA <br /> Visualizer!
                    </h1>
                </div>
                <p className="text-lg">
                    This interactive website helps you visualize{' '}
                    <a
                        className="text-sky-500"
                        target="_blank"
                        href="https://en.wikipedia.org/wiki/Deterministic_finite_automaton"
                    >
                        Deterministic Finite Automata (DFAs)
                    </a>{' '}
                    and understand how they work with regular expressions. Build
                    a DFA from a regex, then test strings to see if they are
                    accepted by the automaton ;&#x29;
                </p>
                <p className="text-lg">
                    Click on the{' '}
                    <span className="text-sky-500">"Get Started"</span> button
                    to run the demo and learn!
                </p>
                <div className="flex items-center gap-2 text-gray-800">
                    <input
                        type="checkbox"
                        onChange={toggleNeverShow}
                        className="cursor-pointer"
                        id="never-show-again"
                    />
                    <label
                        htmlFor="never-show-again"
                        className="cursor-pointer"
                    >
                        Never show this again
                    </label>
                </div>
                <div className="flex justify-end items-stretch gap-3">
                    <button
                        onClick={close}
                        className="w-[50%] px-5 py-3 rounded-md bg-sky-100 border-2 border-sky-500 text-sky-500"
                    >
                        Close
                    </button>
                    <button
                        onClick={runDemo}
                        className="w-[50%] px-5 py-3 rounded-md bg-sky-500 text-white border-2 border-sky-500"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WelcomeModal;
