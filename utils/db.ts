import { openDB } from 'idb';

const DB_NAME = 'myDatabase';
const STORE_NAME = 'myStore';

const initDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {
                    keyPath: 'id',
                    autoIncrement: true,
                });
            }
        },
    });
};

export const addData = async (data) => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    await tx.store.add(data);
    await tx.done;
};

export const getData = async (id) => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const data = await tx.store.get(id);
    await tx.done;
    return data;
};

export const getAllData = async () => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const allData = await tx.store.getAll();
    await tx.done;
    return allData;
};

export const deleteData = async (id) => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    await tx.store.delete(id);
    await tx.done;
};

export const clearData = async () => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    await tx.store.clear();
    await tx.done;
};
