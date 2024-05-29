import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { LegendContents } from '../constants/legendData';
import { guideLine } from '../constants/guidelineData';

interface PropsInterface {
    show: boolean;
}

function LegendPanel(props: PropsInterface) {
    const { show } = props;
    return (
        <div className="legend-panel">
            <CSSTransition
                in={show}
                timeout={300}
                classNames="slide"
                unmountOnExit
            >
                <div className="flex flex-col gap-5 absolute top-5 right-5 py-2 px-3 rounded-md w-[20rem] h-3/4 bg-gray-50 z-10">
                    <div className="flex flex-col items-center justify-center w-full gap-2 mt-10 pl-5">
                        {LegendContents.map((content, index) => (
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

                    <div className="grow flex flex-col items-start pb-2 justify-start pl-5">
                        <h1 className="text-sky-500 text-md">Guidelines:</h1>
                        <div className="mt-[1rem] flex flex-col items-start justify-center gap-2">
                            {guideLine.map((guides, index) => (
                                <h1 className="text-gray-500 text-sm">
                                    {index + 1}. {guides}
                                </h1>
                            ))}
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}

export default LegendPanel;
