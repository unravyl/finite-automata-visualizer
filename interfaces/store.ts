import { NodeInterface, LinkInterface } from './graph';

interface DFAStoreData {
    id: number;
    when: string;
    nodes: NodeInterface[];
    links: LinkInterface[];
    regex: string;
}

export interface DFAStoreState {
    fetchDfaFromIdb: () => Promise<DFAStoreData[]>;
    addDfaToIdb: (
        data: Omit<DFAStoreData, 'id' | 'when'>
    ) => Promise<DFAStoreData>;
    getDfaFromIdb: (
        id: DFAStoreData['id']
    ) => Promise<DFAStoreData | undefined>;
}
