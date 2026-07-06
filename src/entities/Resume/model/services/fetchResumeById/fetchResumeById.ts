import { createAsyncThunk } from "@reduxjs/toolkit";
import { Resume } from "../../types/ResumeSchema";
import { resumeRepository } from "../../storage/resumeIdbStorage";


export const fetchResumeById = createAsyncThunk<Resume, string, {rejectValue: string}>(
    'resume/fetchResumeById',
    async (id, thunkApi) => {
        const resume = await resumeRepository.getById(id);
        if (!resume) return thunkApi.rejectWithValue('not found resume with given id')
        return resume;
    }
)