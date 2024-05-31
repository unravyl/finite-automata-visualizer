import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useDfaStore } from '../store/dfaStore';

import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';
import { mdiTrashCanOutline } from '@mdi/js';
import { mdiShareOutline } from '@mdi/js';
import { mdiLink } from '@mdi/js';

interface SidePanelItemProps {
    input: any;
    handleRegexClick: Function;
    selectedInput: number;
    getInputsFromIdb: Function;
}

function SidePanelItem(props: SidePanelItemProps) {
    const { deleteDfaFromIdb } = useDfaStore();
    const { input, handleRegexClick, selectedInput, getInputsFromIdb } = props;

    const [showMenu, setShowMenu] = useState(false);
    const [showLinkCopied, setShowLinkCopied] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);
    return (
        <div className="side-panel-item">
            <button
                key={input.id}
                onClick={() => handleRegexClick(input.id, input.regex)}
                className={`w-full flex items-center justify-between gap-2 p-2 rounded-md hover:bg-sky-100 hover:text-sky-500 ${selectedInput === input.id && 'bg-sky-100 text-sky-500'}`}
            >
                <span className="w-[90%] text-start truncate">
                    {input.regex}
                </span>

                <div ref={menuRef}>
                    <button
                        onClick={() => {
                            setShowMenu(!showMenu);
                        }}
                    >
                        <Icon path={mdiDotsVertical} size={1} />
                    </button>
                    <div className="relative w-full flex justify-end">
                        <CSSTransition
                            in={showMenu}
                            timeout={100}
                            classNames="slide"
                            unmountOnExit
                        >
                            <div className="absolute py-2 px-4 flex flex-col gap-1 bg-white rounded-md shadow-md">
                                <button
                                    onClick={() => {
                                        deleteDfaFromIdb(input.id);
                                        setShowMenu(false);
                                        getInputsFromIdb();
                                    }}
                                    className="flex gap-1 text-red-500 hover:underline"
                                >
                                    <Icon path={mdiTrashCanOutline} size={1} />
                                    delete
                                </button>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            `http://localhost:3000/?regex=${input.regex}`
                                        );
                                        // navigator.clipboard.writeText(
                                        //     'https://tinyurl.com/2x6wr6n8'
                                        // );
                                        setShowLinkCopied(true);
                                        setShowMenu(false);
                                        setTimeout(() => {
                                            setShowLinkCopied(false);
                                        }, 2000);
                                    }}
                                    className="flex gap-1 text-sky-500 hover:underline"
                                >
                                    <Icon path={mdiShareOutline} size={1} />
                                    share
                                </button>
                            </div>
                        </CSSTransition>
                    </div>
                </div>
            </button>
            <CSSTransition
                in={showLinkCopied}
                timeout={300}
                classNames="slide"
                unmountOnExit
            >
                <div className="absolute top-5 w-screen flex justify-center">
                    <div className="bg-green-200 rounded-full py-2 px-5 flex items-center gap-2">
                        <Icon path={mdiLink} size={1} />
                        Link copied!
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}

export default SidePanelItem;
