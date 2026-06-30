import { openDB } from 'idb';
import type { AppDB } from '../types/types';

const DB_NAME = 'cv-builder-db';
const DB_VERSION = 1;

export const dbPromise = openDB<AppDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('resumes')) {
            const store = db.createObjectStore('resumes', { keyPath: 'id' });
            store.createIndex('by-updatedAt', 'updatedAt');
        }
    },
});