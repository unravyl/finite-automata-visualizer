import React from 'react';
import { LinkInterface, NodeInterface } from '../utils/graph';

interface PropsInterface {
    nodes: NodeInterface[];
    links: LinkInterface[];
}

const GraphSummary = (props: PropsInterface) => {
    const { nodes, links } = props;
    return (
        <div className="flex flex-col my-5 gap-5">
            <div className="flex flex-col">
                {nodes.length > 0 && <p>NODES</p>}
                {nodes &&
                    nodes.map((node) => {
                        return <p className="flex">{node.id}</p>;
                    })}
            </div>
            <div className="felx flex-col">
                {links.length > 0 && <p>LINKS</p>}
                {links &&
                    links.map((link) => {
                        return (
                            <div className="flex">
                                <p>
                                    {link.source} &gt; {link.target} (
                                    {link.transition})
                                </p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default GraphSummary;
