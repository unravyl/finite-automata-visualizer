import { SimulationLinkDatum, SimulationNodeDatum } from 'd3';

export interface NodeInterface extends SimulationNodeDatum {
    id: number;
    values: number[];
    group: number;
    isFinalState: boolean;
    active?: boolean; // for highlighting (optional)
}

export interface LinkInterface
    extends SimulationLinkDatum<SimulationNodeDatum> {
    source: NodeInterface;
    target: NodeInterface;
    transition: string;
    active?: boolean;
}
