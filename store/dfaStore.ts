import create from 'zustand';
import { addData, getAllData, getData } from '../utils/db';

/*
dfaData:
- id
- regex
- nodes
- links
- when
*/

export const useDfaStore = create((set) => ({
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
}));
