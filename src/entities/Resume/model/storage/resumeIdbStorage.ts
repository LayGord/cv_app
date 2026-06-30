import { dbPromise } from 'shared/lib/idb/config/db';
import type { Resume } from '../types/ResumeSchema';


export const resumeRepository = {
    async getAll(): Promise<Resume[]> {
        const db = await dbPromise;
        return db.getAllFromIndex('resumes', 'by-updatedAt');
    },

    async getById(id: string): Promise<Resume | undefined> {
        const db = await dbPromise;
        return db.get('resumes', id);
    },

    async save(resume: Resume): Promise<void> {
        const db = await dbPromise;

        const existing = await db.get('resumes', resume.id);
        const now = new Date().toISOString();

        await db.put('resumes', {
            ...resume,
            createdAt: existing?.createdAt ?? now,
            updatedAt: now,
        });
    },

    async remove(id: string): Promise<void> {
        const db = await dbPromise;
        await db.delete('resumes', id);
    },

    async clear(): Promise<void> {
        const db = await dbPromise;
        await db.clear('resumes');
    },
};