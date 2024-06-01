import { create } from 'zustand';
import {
    addData,
    getAllData,
    getData,
    deleteData,
    clearData,
} from '../utils/db';
import { DFAStoreState } from '../interfaces/store';

/*
dfaData:
- id
- regex
- nodes
- links
- when
*/

export const useDfaStore = create<DFAStoreState>((set) => ({
    fetchDfaFromIdb: async () => {
        const data = await getAllData();
        return data.reverse();
    },

    addDfaToIdb: async (data) => {
        const when = new Date().toISOString();
        await addData({ ...data, when });
        const all = await getAllData();
        const dfaData = all[all.length - 1];
        return dfaData;
    },

    getDfaFromIdb: async (id) => {
        const dfaData = await getData(id);
        return dfaData;
    },

    deleteDfaFromIdb: async (id) => {
        await deleteData(id);
    },

    deleteAllDfaFromIdb: async () => {
        await clearData();
    },
}));
