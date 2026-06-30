import type { DBSchema } from 'idb';
import type { Resume } from 'entities/Resume';

export interface AppDB extends DBSchema {
  resumes: {
    key: string;
    value: Resume;
    indexes: {
      'by-updatedAt': string;
    };
  };
}