import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    ContactLink,
    Education,
    Job,
    Project,
    ContactsData,
    PersonalData,
    ResumeSchema,
    Skill,
    ObjectiveData,
    Position,
} from "../types/ResumeSchema";

const initialState: ResumeSchema = {
    resumeDraft: {
        id: '',
        personal: {
            firstname: '',
            lastname: '',
            patronymic: undefined,
            birthdate: undefined,
            photo: undefined,
            sex: 'male',
            citizenship: '',
            country: '',
            city: '',
        },
        contacts: {
            email: 'example@mail.com',
            phone: undefined,
            links: [{id: '1', title: 'Telegram', link: ''}, {id: '2', title: 'LinkedIn', link: ''}],
        },
        objective: {
            positions: [{id: '1', name: ''}],
            typeOfEmpl: [],
            format: 'any',
        },
        experience: {
            skills: [],
            jobs: [{id: '1', company: '', position: '', dateFrom: ''}],
            projects: [{id: '1', title: '', link: '', description: ''}],
            education: [{id: '1', org: '', grade: 'bachelor', faculty: '', program: '', dateFrom: ''}],
            langs: [],
        }
    }
};


export const resumeSlice = createSlice({
    name: 'resume',
    initialState: initialState,
    reducers: {
        setResumeId: (state, action: PayloadAction<string>) => {
            state.resumeDraft.id = action.payload;
        },
        // personalData
        updatePersonalData: (state, action: PayloadAction<Partial<PersonalData>>) => {
            state.resumeDraft.personal = {
                ...state.resumeDraft.personal,
                ...action.payload,
            }
        },

        //contactsData
        updateContactsData: (state, action: PayloadAction<Partial<ContactsData>>) => {
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

        // objective Data
        addPosition: (state, action: PayloadAction<string>) => {
            state.resumeDraft.objective.positions.push({id: action.payload, name: ''})
        },
        updatePosition: (state, action: PayloadAction<Position>) => {
            state.resumeDraft.objective.positions = 
            state.resumeDraft.objective.positions.map(
                (item) => item.id === action.payload.id ? action.payload : item
            );
        },
        deletePosition: (state, action: PayloadAction<string>) => {
            state.resumeDraft.objective.positions = 
            state.resumeDraft.objective.positions.filter(
                (item) => item.id !== action.payload
            );
        },
        updateObjectiveData: (state, action: PayloadAction<Partial<ObjectiveData>>) => {
            state.resumeDraft.objective = {
                ...state.resumeDraft.objective,
                ...action.payload
            };
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
            state.resumeDraft.experience.education.push({
                id: action.payload, org: '', faculty: '', program: '', dateFrom: '', grade: 'bachelor'
            })
        },
        updateEducation: (state, action: PayloadAction<Education>) => {
            state.resumeDraft.experience.education = state.resumeDraft.experience.education.map(
                (item) => item.id === action.payload.id ? action.payload : item
            )
        },
        deleteEducation: (state, action: PayloadAction<string>) => {
            state.resumeDraft.experience.education = state.resumeDraft.experience.education.filter(
                (item) => item.id !== action.payload
            )
        }

    },
})

export const { actions: resumeActions } = resumeSlice;
export const { reducer: resumeReducer } = resumeSlice;