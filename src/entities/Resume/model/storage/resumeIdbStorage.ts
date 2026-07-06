import { dbPromise } from 'shared/lib/idb/config/db';
import type { Resume } from '../types/ResumeSchema';
import type { DBSchema } from 'idb';


export interface AppDB extends DBSchema {
  resumes: {
    key: string;
    value: Resume;
    indexes: {
      'by-updatedAt': string;
    };
  };
}

const dbPromiseWithCb = dbPromise<AppDB>(
    (db) => {
        if (!db.objectStoreNames.contains('resumes')) {
            const store = db.createObjectStore('resumes', { keyPath: 'id' });
            store.createIndex('by-updatedAt', 'updatedAt');
        }
    }
)

export const resumeRepository = {
    async getAll(): Promise<Resume[]> {
        const db = await dbPromiseWithCb;
        return db.getAllFromIndex('resumes', 'by-updatedAt');
    },

    async getById(id: string): Promise<Resume | undefined> {
        const db = await dbPromiseWithCb;
        return db.get('resumes', id);
    },

    async save(resume: Resume): Promise<void> {
        const db = await dbPromiseWithCb;

        const existing = await db.get('resumes', resume.id);
        const now = new Date().toISOString();

        await db.put('resumes', {
            ...resume,
            createdAt: existing?.createdAt ?? now,
            updatedAt: now,
        });
    },

    async remove(id: string): Promise<void> {
        const db = await dbPromiseWithCb;
        await db.delete('resumes', id);
    },

    async clear(): Promise<void> {
        const db = await dbPromiseWithCb;
        await db.clear('resumes');
    },
};