interface DFAStoreData {
    id: number;
    // ...other properties of your DFA (states, alphabet, transitions, etc.)
    when: string;
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
