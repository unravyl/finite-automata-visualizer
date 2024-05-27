import React from 'react'
import { CSSTransition } from 'react-transition-group';


interface PropsInterface {
    show: boolean;
}

function LegendPanel(props: PropsInterface) {
    const { show } = props;
    return (
        <div className="side-panel">
            <CSSTransition
                in={show}
                timeout={300}
                classNames="slide"
                unmountOnExit
            >
                <div className="flex flex-col gap-5 absolute top-0 right-0 py-2 px-3 w-[215px] h-full bg-gray-50 z-10">
                        <div className="grow flex flex-col items-center justify-center">
                            <h1 className="text-sky-500 text-sm">
                                No inputs yet
                            </h1>
                        </div>
                </div>
            </CSSTransition>
        </div>
    );
}

export default LegendPanel