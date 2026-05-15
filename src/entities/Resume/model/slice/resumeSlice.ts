import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Resume, ResumePersonalData, ResumeSchema } from "../types/ResumeSchema";

const initialState: ResumeSchema = {
    id: '',
    resumeDraft: {
        personal: {
            firstname: '',
            lastname: '',
            patronymic: undefined,
            birthdate: undefined,
            photo: undefined,
            sex: '',
            citizenship: '',
            country: '',
            city: '',
        },
        contacts: {
            email: 'example@mail.com',
            phone: undefined,
            others: [],
        },
        experience: {
            skills: [],
            jobs: [],
            projects: [],
            educations: [],
            langs: [],
        },
    }
}

export const resumeSlice = createSlice({
    name: 'resume',
    initialState: initialState,
    reducers: {
        updatePersonalData: (state, action: PayloadAction<DeepPartial<ResumePersonalData>>) => {
            state.resumeDraft.personal = {
                ...state.resumeDraft.personal,
                ...action.payload,
            }
        }
    },
})

export const { actions: resumeActions } = resumeSlice;
export const { reducer: resumeReducer } = resumeSlice;