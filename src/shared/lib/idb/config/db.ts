import { IDBPDatabase, IDBPTransaction, openDB } from 'idb';

const DB_NAME = 'cv-builder-db';
const DB_VERSION = 1;

export const dbPromise = <AppDB>(
    upgradeCb: (
        database: IDBPDatabase<any>, 
        oldVersion: number, 
        newVersion: number | null, 
        transaction: IDBPTransaction<any, any[], "versionchange">, 
        event: IDBVersionChangeEvent) => void
) => openDB<AppDB>(DB_NAME, DB_VERSION, {
    upgrade: upgradeCb
});

