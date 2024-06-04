import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { LEGEND } from '../constants/legend';
import { GUIDELINES } from '../constants/guidelines';
import Link from 'next/link';

interface PropsInterface {
    show: boolean;
}

function LegendPanel(props: PropsInterface) {
    const [showCaption, setShowCaption] = useState(false);
    const { show } = props;
    return (
        <div className="legend-panel">
            <CSSTransition
                in={show}
                timeout={300}
                classNames="slide"
                unmountOnExit
            >
                <div className="flex flex-col overflow-y-auto justify-evenly gap-5 absolute top-0 right-0 py-2 px-3 rounded-md w-[20rem] h-full bg-gray-50 z-10">
                    <div className="flex flex-col items-center justify-center w-full gap-2 mt-10 px-5">
                        {LEGEND.map((content, index) => (
                            <div
                                className="flex flex-1 items-center w-full justify-center"
                                key={index}
                            >
                                <div
                                    className={`size-[2rem] w-[10%] flex items-center justify-center text-center ${content.bgClass} ${content.borderClass} border-2`}
                                >
                                    {content.description}
                                </div>
                                <h1 className="text-sm w-[90%] text-gray-500 pl-2">
                                    {content.title}
                                </h1>
                            </div>
                        ))}
                    </div>

                    <div className="grow flex flex-col items-start pb-2 justify-start px-5">
                        <h1 className="text-sky-500 text-md">Guidelines:</h1>
                        <div className="mt-[1rem] flex flex-col items-start justify-center gap-2">
                            {GUIDELINES.map((guides, index) => (
                                <div className="flex gap-2 text-gray-500 text-sm">
                                    <p>{index + 1}.</p>
                                    <p>{guides}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='text-black px-5 pb-4'>
                        <Link href='https://github.com/maxellmilay/finite-automata-visualizer' className='relative flex  gap-5 mb-2'   target='_blank'>
                            <i className={`bx bxl-github text-sky-500 z-1 hover:scale-125 transition-all text-[2.5rem]`}
                            onMouseEnter={() => setShowCaption(true)}
                            onMouseLeave={()=> setShowCaption(false)}
                            ></i>
                            <div className='flex items-center justify-center transition-all'>
                            {showCaption && <p className='text-white opacity-50 flex h-[1.8rem] items-center justify-center text-[0.7rem] rounded-md border-1 bg-sky-500 w-[6rem]'>Visit our Repo</p>}
                            </div>
                        </Link>
                        <div className='text-gray text-sky-500 text-md'>Contributors</div>
                        <div className='flex flex-col text-sm text-gray-500 gap-1 mt-1'>
                            <Link href='https://maxell-milay.vercel.app/' className='z-0 hover:scale-105 transition-all' target='_blank'>Maxell Milay</Link>
                            <Link href='https://sheldonsagrado.vercel.app/' className='hover:scale-105 transition-all' target='_blank'>Sheldon Arthur</Link>
                            <Link href='https://jourdancatarina.vercel.app/' className='hover:scale-105 transition-all' target='_blank'>Jourdan Catarina</Link>
                            <Link href='https://jed-donaire.vercel.app/' className='hover:scale-105 transition-all' target='_blank'>Jed Edison</Link>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}

export default LegendPanel;
