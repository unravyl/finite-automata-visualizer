import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Icon from '@mdi/react';
import { mdiResistorNodes } from '@mdi/js';
import { mdiChevronDown } from '@mdi/js';
import { mdiCheckAll } from '@mdi/js';
import { mdiRocketLaunchOutline } from '@mdi/js';
import { parse } from 'path';

const inputs = [
    {
        id: 0,
        regex: '(a+b).(aa+b).(b.b).',
        when: '2024-05-19T14:08:57.601Z',
    },
    {
        id: 1,
        regex: '(a+b).(aa+b).(b.b).',
        when: '2024-05-19T14:08:57.601Z',
    },
    {
        id: 2,
        regex: '(a+b).(aa+b).(b.b).',
        when: '2024-05-19T14:08:57.601Z',
    },
    {
        id: 3,
        regex: '(a+b).(aa+b).(b.b).',
        when: '2024-05-19T14:08:57.601Z',
    },
    {
        id: 4,
        regex: '(a+b).(aa+b).(b.b).',
        when: '2024-05-19T14:08:57.601Z',
    },
    {
        id: 5,
        regex: '(a+b).(aa+b).(b.b).',
        when: '2024-05-19T14:08:57.601Z',
    },
    {
        id: 6,
        regex: '(a+b).(aa+b).(b.b).',
        when: '2024-05-19T14:08:57.601Z',
    },
    {
        id: 7,
        regex: '(a+b).(aa+b).(b.b).',
        when: '2024-05-19T14:08:57.601Z',
    },
    {
        id: 8,
        regex: '(a+b).(aa+b).(b.b).',
        when: '2024-05-19T14:08:57.601Z',
    },
    {
        id: 9,
        regex: '(a+b).(aa+b).(b.b).',
        when: '2024-05-15T14:08:57.601Z',
    },
    {
        id: 10,
        regex: '(a+b).(aa+b).(b.b).',
        when: '2024-05-15T14:08:57.601Z',
    },
    {
        id: 11,
        regex: '(a+b).(aa+b).(b.b)',
        when: '2024-05-10T14:08:57.601Z',
    },
    {
        id: 12,
        regex: '(a+b).(aa+b).(b.b)',
        when: '2024-05-10T14:08:57.601Z',
    },
    {
        id: 13,
        regex: '(a+b).(aa+b).(b.b)',
        when: '2024-04-10T14:08:57.601Z',
    },
];

const apps = {
    0: {
        title: 'Regex to DFA',
        placeholder: 'Enter regex',
    },
    1: {
        title: 'String Checker',
        placeholder: 'Enter string',
    },
};

function SidePanel(props) {
    const { show } = props;
    const [showAppsDropdown, setShowAppsDropdown] = useState(false);
    const [selectedApp, setSelectedApp] = useState(0);
    const [selectedInput, setSelectedInput] = useState(null);
    const [inputString, setInputString] = useState('');

    // computed
    const inputsToday = inputs.filter((input) => {
        const inputDate = new Date(input.when);
        const today = new Date();

        return inputDate.getDate() === today.getDate();
    });

    const inputsSevenDays = inputs.filter((input) => {
        const inputDate = new Date(input.when);
        const today = new Date();

        return (
            inputDate.getDate() >= today.getDate() - 7 &&
            inputDate.getDate() < today.getDate()
        );
    });

    const oldInputs = inputs.filter((input) => {
        const inputDate = new Date(input.when);
        const today = new Date();

        return inputDate.getDate() < today.getDate() - 7;
    });

    const disableInputButton =
        inputString.trim().length === 0 ||
        (selectedApp === 1 && !selectedInput);

    // methods
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputString);
    };

    //hooks

    return (
        <div className="side-panel">
            <CSSTransition
                in={show}
                timeout={300}
                classNames="slide"
                unmountOnExit
            >
                <div className="flex flex-col gap-5 absolute top-0 left-0 py-2 px-3 w-[215px] h-full bg-gray-50 z-10">
                    <div className="flex flex-col w-full text-sky-500 mt-10">
                        <h1 className="flex items-center justify-between text-md font-bold px-2">
                            <div className="flex items-center gap-2">
                                <Icon path={mdiResistorNodes} size={1} />
                                <span>{apps[selectedApp].title}</span>
                            </div>
                            <button
                                onClick={() =>
                                    setShowAppsDropdown(!showAppsDropdown)
                                }
                                className="rounded-full hover:bg-black/[.05] transition duration-200"
                            >
                                <Icon path={mdiChevronDown} size={1} />
                            </button>
                        </h1>
                        <div className="relative">
                            {showAppsDropdown && (
                                <div className="absolute w-full bg-white p-2">
                                    {Object.keys(apps).map(
                                        (app) =>
                                            parseInt(app) !== selectedApp && (
                                                <button
                                                    key={app}
                                                    onClick={() => {
                                                        setSelectedApp(
                                                            parseInt(app)
                                                        );
                                                        setShowAppsDropdown(
                                                            false
                                                        );
                                                    }}
                                                    className="flex gap-2 items-center p-2 rounded-md w-full hover:bg-gray-100"
                                                >
                                                    <Icon
                                                        path={mdiCheckAll}
                                                        size={1}
                                                    />
                                                    <span>
                                                        {apps[app].title}
                                                    </span>
                                                </button>
                                            )
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex items-center">
                        <input
                            type="text"
                            placeholder={apps[selectedApp].placeholder}
                            className="rounded-l-md h-full w-full p-2 border border-gray-200 focus:outline-none focus:border-sky-500"
                            onChange={(e) => setInputString(e.target.value)}
                        />
                        <button
                            type="submit"
                            className={`rounded-r-md h-full p-2 bg-sky-500 text-white hover:bg-sky-600 transition duration-200
                                        ${disableInputButton && 'cursor-no-drop'}`}
                            disabled={disableInputButton}
                        >
                            <Icon path={mdiRocketLaunchOutline} size={1} />
                        </button>
                    </form>

                    <div className="flex flex-col gap-3 w-full text-gray-500">
                        {inputsToday.length > 0 && (
                            <div className="flex flex-col gap-1 w-full">
                                <h1 className="text-xs text-sky-500">Today</h1>
                                {inputsToday.map((input) => (
                                    <button
                                        key={input.id}
                                        onClick={() =>
                                            setSelectedInput(input.id)
                                        }
                                        className={`flex items-center gap-2 p-2 rounded-md hover:bg-sky-100 hover:text-sky-500 ${selectedInput === input.id && 'bg-sky-100 text-sky-500'}`}
                                    >
                                        <span>{input.regex}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                        {inputsSevenDays.length > 0 && (
                            <div className="flex flex-col gap-1 w-full">
                                <h1 className="text-xs text-sky-500">
                                    Previous 7 days
                                </h1>
                                {inputsSevenDays.map((input) => (
                                    <button
                                        key={input.id}
                                        onClick={() =>
                                            setSelectedInput(input.id)
                                        }
                                        className={`flex items-center gap-2 p-2 rounded-md hover:bg-sky-100 hover:text-sky-500 ${selectedInput === input.id && 'bg-sky-100 text-sky-500'}`}
                                    >
                                        <span>{input.regex}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                        {oldInputs.length > 0 && (
                            <div className="flex flex-col gap-1 w-full">
                                <h1 className="text-xs text-sky-500">Older</h1>
                                {oldInputs.map((input) => (
                                    <button
                                        key={input.id}
                                        onClick={() =>
                                            setSelectedInput(input.id)
                                        }
                                        className={`flex items-center gap-2 p-2 rounded-md hover:bg-sky-100 hover:text-sky-500 ${selectedInput === input.id && 'bg-sky-100 text-sky-500'}`}
                                    >
                                        <span>{input.regex}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}

export default SidePanel;