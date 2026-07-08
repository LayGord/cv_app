import { createAsyncThunk } from "@reduxjs/toolkit";
import { resumeRepository } from "../../storage/resumeIdbStorage";
import { Resume } from "../../types/ResumeSchema";


export const fetchResumeIds = 
createAsyncThunk<{
        id: string, 
        title: string, 
        objective: Partial<Resume['objective']>, 
        createdAt: string, 
        updatedAt?: string, 
        prevImg?: string
    }[], void
>
(
    'resume/fetchResumeIds',
    async () => {
        return (await resumeRepository.getAll()).map(
            ( {id, title, objective, updatedAt='', createdAt='', prevImg} ) => ({id, title, objective, updatedAt, createdAt, prevImg})
        )
    }
);