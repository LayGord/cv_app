import { createAsyncThunk } from "@reduxjs/toolkit";
import { resumeRepository } from "../../storage/resumeIdbStorage";


export const deleteResumeById = createAsyncThunk<string, string>(
    'resume/deleteResumeById',
    async (id) => {
        await resumeRepository.remove(id);
        return id;
    }
)