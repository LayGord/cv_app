import { createAsyncThunk } from "@reduxjs/toolkit";
import { Resume } from "../../types/ResumeSchema";
import { resumeRepository } from "../../storage/resumeIdbStorage";

type ResumePatch = Partial<Resume> & { id: string };

export const patchResume = createAsyncThunk<Resume, ResumePatch>(
    'resume/patchResume',
    async ({ id, ...changes }) => {
        const existing = await resumeRepository.getById(id);

        if (!existing) {
            throw new Error('Resume not found');
        }

        const updatedResume: Resume = {
            ...existing,
            ...changes,
            updatedAt: new Date().toISOString(),
        };

        await resumeRepository.save(updatedResume);

        return updatedResume;
    }
);