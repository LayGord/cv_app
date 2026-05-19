import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactLink, ResumeContactsData, ResumePersonalData, ResumeSchema, Skill } from "../types/ResumeSchema";

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
            links: [],
        },
        experience: {
            skills: [],
            jobs: [],
            projects: [],
            educations: [],
            langs: [],
        }
    }
}

export const resumeSlice = createSlice({
    name: 'resume',
    initialState: initialState,
    reducers: {
        // personalData
        updatePersonalData: (state, action: PayloadAction<Partial<ResumePersonalData>>) => {
            state.resumeDraft.personal = {
                ...state.resumeDraft.personal,
                ...action.payload,
            }
        },

        //contactsData
        updateContactsData: (state, action: PayloadAction<Partial<ResumeContactsData>>) => {
            state.resumeDraft.contacts = {
                ...state.resumeDraft.contacts,
                ...action.payload,
            }
        },
        addContactLink: (state, action: PayloadAction<string>) => {
            state.resumeDraft.contacts.links.push({id: action.payload, title: '', link: ''});
        },
        updateContactLink: (state, action: PayloadAction<ContactLink>) => {
            state.resumeDraft.contacts.links = state.resumeDraft.contacts.links.map(
                item => item.id === action.payload.id ? action.payload : item
            )
        },
        deleteContactLink: (state, action: PayloadAction<string>) => {
            state.resumeDraft.contacts.links = 
                state.resumeDraft.contacts.links?.filter(item => item.id !== action.payload);
        },

        //experienceData
        updateSkillsList: (state, action: PayloadAction<Skill[]>) => {
            state.resumeDraft.experience.skills = action.payload
        }
    },
})

export const { actions: resumeActions } = resumeSlice;
export const { reducer: resumeReducer } = resumeSlice;