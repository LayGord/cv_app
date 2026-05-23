import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    ContactLink,
    Education,
    Job,
    Project,
    ResumeContactsData,
    ResumeExperienceData,
    ResumePersonalData,
    ResumeSchema,
    Skill,
} from "../types/ResumeSchema";

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
            links: [{id: '1', title: 'Telegram', link: ''}, {id: '2', title: 'LinkedIn', link: ''}],
        },
        experience: {
            skills: [],
            jobs: [{id: '1', company: '', position: '', dateFrom: ''}],
            projects: [{id: '1', title: '', link: '', description: ''}],
            educations: [{id: '1', org: '', grade: 'bachelor', faculty: '', program: '', dateFrom: ''}],
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
        },

        addJob: (state, action: PayloadAction<string>) => {
            state.resumeDraft.experience.jobs.push({id: action.payload, company: '', position: '', dateFrom: ''})
        },
        updateJob: (state, action: PayloadAction<Job>) => {
            state.resumeDraft.experience.jobs = state.resumeDraft.experience.jobs.map(
                (item) => item.id === action.payload.id ? action.payload : item
            )
        },
        deleteJob: (state, action: PayloadAction<string>) => {
            state.resumeDraft.experience.jobs = state.resumeDraft.experience.jobs.filter(
                (item) => item.id !== action.payload
            )
        },

        addProject: (state, action: PayloadAction<string>) => {
            state.resumeDraft.experience.projects.push({id: action.payload, title: '', link: '', description: ''})
        },
        updateProject: (state, action: PayloadAction<Project>) => {
            state.resumeDraft.experience.projects = state.resumeDraft.experience.projects.map(
                (item) => item.id === action.payload.id ? action.payload : item
            )
        },
        deleteProject: (state, action: PayloadAction<string>) => {
            state.resumeDraft.experience.projects = state.resumeDraft.experience.projects.filter(
                (item) => item.id !== action.payload
            )
        },

        addEducation: (state, action: PayloadAction<string>) => {
            state.resumeDraft.experience.educations.push({
                id: action.payload, org: '', faculty: '', program: '', dateFrom: '', grade: 'bachelor'
            })
        },
        updateEducation: (state, action: PayloadAction<Education>) => {
            state.resumeDraft.experience.educations = state.resumeDraft.experience.educations.map(
                (item) => item.id === action.payload.id ? action.payload : item
            )
        },
        deleteEducation: (state, action: PayloadAction<string>) => {
            state.resumeDraft.experience.educations = state.resumeDraft.experience.educations.filter(
                (item) => item.id !== action.payload
            )
        },

        updateExperienceData: (state, action: PayloadAction<Partial<ResumeExperienceData>>) => {
            state.resumeDraft.experience = {...state.resumeDraft.experience, ...action.payload};
        }

    },
})

export const { actions: resumeActions } = resumeSlice;
export const { reducer: resumeReducer } = resumeSlice;