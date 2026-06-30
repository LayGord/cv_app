import { createAsyncThunk } from "@reduxjs/toolkit";
import { Resume } from "../../types/ResumeSchema";
import { resumeRepository } from "../../storage/resumeIdbStorage";


export const updateResume = createAsyncThunk<Resume, Resume>(
    'resumeActions/updateResume',
    async (resume) => {
        await resumeRepository.save(resume);
        return resume;
    }
)