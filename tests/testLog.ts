import { LinkInterface, NodeInterface } from '../interfaces/graph';

export const testLog = (nodes: NodeInterface[], links: LinkInterface[]) => {
    console.log('LOG NODES');
    nodes.map((node) => {
        console.log(node.id, node.values.join(' '));
    });
    console.log('\nLOG LINKS');
    links.map((link) => {
        console.log(link.source.id, link.target.id, link.transition);
    });
};

export const testFollowPos = (data) => {
    console.log('LOG FOLLOWPOS');
    data.map((datum) => {
        console.log(datum.number, datum.symbol, datum.followpos.join(' '));
    });
};
