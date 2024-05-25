import { SimulationLinkDatum, SimulationNodeDatum } from 'd3';

export interface NodeInterface extends SimulationNodeDatum {
    id: number;
    values: number[];
    group: number;
    isFinalState: boolean;
}

export interface LinkInterface
    extends SimulationLinkDatum<SimulationNodeDatum> {
    source: NodeInterface;
    target: NodeInterface;
    transition: string;
}
