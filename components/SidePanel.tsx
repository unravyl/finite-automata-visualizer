import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Icon from '@mdi/react';
import { mdiResistorNodes } from '@mdi/js';
import { mdiChevronDown } from '@mdi/js';
import { mdiCheckAll } from '@mdi/js';
import { mdiRocketLaunchOutline } from '@mdi/js';

import Parser from '../classes/Parser';
import { generateNodesAndLinks } from '../utils/graph';
import { useDfaStore } from '../store/dfaStore';

const apps = {
    0: {
        title: 'Regex to DFA',
        placeholder: 'Enter regex',
        icon: mdiResistorNodes,
    },
    1: {
        title: 'String Checker',
        placeholder: 'Enter string',
        icon: mdiCheckAll,
    },
};

interface PropsInterface {
    show: boolean;
    setLinks: Function;
    setNodes: Function;
}

function SidePanel(props: PropsInterface) {
    const { fetchDfaFromIdb, addDfaToIdb, getDfaFromIdb } = useDfaStore();
    const { show, setNodes, setLinks } = props;

    const [inputs, setInputs] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [showAppsDropdown, setShowAppsDropdown] = useState(false);
    const [selectedApp, setSelectedApp] = useState(0);
    const [selectedInput, setSelectedInput] = useState(null);
    const [inputString, setInputString] = useState('');

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

    const categorizedInputs = [
        {
            title: 'Today',
            inputs: inputsToday,
        },
        {
            title: 'Previous 7 days',
            inputs: inputsSevenDays,
        },
        {
            title: 'Older',
            inputs: oldInputs,
        },
    ];

    const disableInputButton =
        inputString.trim().length === 0 ||
        (selectedApp === 1 && !selectedInput);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (disableInputButton) {
            if (selectedApp === 1 && !selectedInput) {
                alert('Please select an input to check');
            }
            return;
        }
        setSelectedInput(null);
        generateDFA(inputString);
    };

    const generateDFA = async (inputString: string) => {
        const parser = new Parser(inputString);
        const firstPos = parser.firstPos;
        const followPos = parser.followPos;
        const { nodes, links } = generateNodesAndLinks(firstPos, followPos);
        setNodes(nodes);
        setLinks(links);
        setInputString('');

        const data = {
            regex: inputString,
            nodes: nodes,
            links: links,
        };
        setIsFetching(true);
        const dfaData = await addDfaToIdb(data);
        await getInputsFromIdb();
        setSelectedInput(dfaData.id);
        setIsFetching(false);
    };

    const getInputsFromIdb = async () => {
        setIsFetching(true);
        const all = await fetchDfaFromIdb();
        setInputs(all);
        setIsFetching(false);
    };

    const handleRegexClick = async (id: number) => {
        setSelectedInput(id);
        const dfaData = await getDfaFromIdb(id);
        setNodes(dfaData.nodes);
        setLinks(dfaData.links);
    };

    useEffect(() => {
        getInputsFromIdb();
    }, []);

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
                                <Icon path={apps[selectedApp].icon} size={1} />
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
                                                        path={apps[app].icon}
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
                            value={inputString}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit(e);
                                }
                            }}
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

                    <div className="flex flex-col gap-3 w-full text-gray-500 overflow-y-auto">
                        {categorizedInputs.map(
                            (item) =>
                                item.inputs.length > 0 && (
                                    <div className="flex flex-col gap-1 w-full">
                                        <h1 className="text-xs text-sky-500">
                                            {item.title}
                                        </h1>
                                        {item.inputs.map((input) => (
                                            <button
                                                key={input.id}
                                                onClick={() =>
                                                    handleRegexClick(input.id)
                                                }
                                                className={`flex items-center gap-2 p-2 rounded-md hover:bg-sky-100 hover:text-sky-500 ${selectedInput === input.id && 'bg-sky-100 text-sky-500'}`}
                                            >
                                                <span>{input.regex}</span>
                                            </button>
                                        ))}
                                    </div>
                                )
                        )}
                    </div>

                    {inputs.length === 0 && (
                        <div className="grow flex flex-col items-center justify-center">
                            <h1 className="text-sky-500 text-sm">
                                No inputs yet
                            </h1>
                        </div>
                    )}
                </div>
            </CSSTransition>
        </div>
    );
}

export default SidePanel;
