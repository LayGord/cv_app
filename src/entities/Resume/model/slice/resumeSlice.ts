import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    ResumeSchema,
    PersonalData,
    ContactsData,
    ContactLink,
    ObjectiveData,
    SkillData,
    JobData,
    Position,
    EducationData,
    ProjectData,
    LanguageData,
} from "../types/ResumeSchema";
import {
    ErrorTypes,
    LinkErrors,
    LinkErrorsPayload,
    LinkErrorTypes,
    ObjectiveDataErrors,
    PersonalDataErrors,
    PositionErrors,
    SkillsDataErrors,
    TypeOfEmplErrors,
} from "../types/resumeValidationSchema";
import { isEmptyObj } from "shared/lib/isEmptyObj/isEmptyObj";

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
            preferred: 'email',
        },
        objective: {
            positions: [{id: '1', name: ''}],
            typeOfEmpl: [],
            format: 'any',
            readyToRelocate: false,
            readyToBTrip: false,
            currency: 'USD'
        },
        aboutMe: '',
        skills: [],
        jobs: [{id: '1', company: '', position: '', dateFrom: ''}],
        projects: [{id: '1', title: '', link: '', description: ''}],
        education: [{id: '1', org: '', grade: 'bachelor', faculty: '', program: '', dateFrom: '', city: ''}],
        langs: [{id: '1', language: '',  level: 'a1'}],
        valErrors: {
            personal: {},
            contacts: {},
            aboutMe: {},
            objective: {},
            skills: {},
            jobs: {},
            projects: {},
            education: {},
            languages: {}
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
        setPersonalDataFieldError: (state, action: PayloadAction<{field: keyof PersonalData; error?: ErrorTypes}>) => {
            const { field, error } = action.payload;
            if (error) {
                state.resumeDraft.valErrors.personal[field] = error;
            } else {
                delete state.resumeDraft.valErrors.personal[field];
            }
        },
        setPersonalDataErrors: (state, action: PayloadAction<PersonalDataErrors>) => {
            state.resumeDraft.valErrors.personal = action.payload
        },

        // contactsData
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
            if (action.payload === state.resumeDraft.contacts.preferred) {
                state.resumeDraft.contacts.preferred = undefined
            }
            if ( state.resumeDraft.valErrors?.contacts.links?.[action.payload]) {
                delete state.resumeDraft.valErrors.contacts.links[action.payload];
                // cleanup empty error records ( records like { 97bbaf2d-3cee: {} } should be removed)
                if (isEmptyObj(state.resumeDraft.valErrors.contacts.links)) delete state.resumeDraft.valErrors.contacts.links;
            }
        },
        preferContact: (state, action: PayloadAction<string>) => {
            state.resumeDraft.contacts.preferred === action.payload 
                ? state.resumeDraft.contacts.preferred = undefined
                : state.resumeDraft.contacts.preferred = action.payload
        },
        setContactsDataFieldError: 
            (state, action: PayloadAction<{ field: Exclude<keyof ContactsData, 'links'>, error?: ErrorTypes }>) => {
                const { field, error } = action.payload;

                if (error) {
                    state.resumeDraft.valErrors.contacts[field] = error
                } else {
                    delete state.resumeDraft.valErrors.contacts[field]
                }
            },
        setContactLinkError: (state, action: PayloadAction<LinkErrorsPayload>) => {
            const { id, field, error } = action.payload;

            if (!state.resumeDraft.valErrors.contacts.links)
                state.resumeDraft.valErrors.contacts.links = {};

            const mergedContactLinkErrItem = {
                ...state.resumeDraft.valErrors.contacts.links[id], [field]: error
            };

            if (!error) delete mergedContactLinkErrItem[field];

            !isEmptyObj(mergedContactLinkErrItem)
                ? state.resumeDraft.valErrors.contacts.links[id] = mergedContactLinkErrItem
                : delete state.resumeDraft.valErrors.contacts.links[id];

            console.log(Boolean(mergedContactLinkErrItem))

            // cleanup empty error records ( records like { 97bbaf2d-3cee: {} } should be removed)
            if (isEmptyObj(state.resumeDraft.valErrors.contacts.links)) delete state.resumeDraft.valErrors.contacts.links;
        },

        // aboutMe
        updateAboutMe: (state, action: PayloadAction<string>) => {
            state.resumeDraft.aboutMe = action.payload
        },
        setAboutMeError: (state, action: PayloadAction<string | undefined>) => {
            state.resumeDraft.valErrors.aboutMe.aboutMe = action.payload as ErrorTypes | undefined; 
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
        deletePosition: (state, action: PayloadAction<string>) => { // PayloadAction<string> = id
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
        

        // skills
        updateSkillsList: (state, action: PayloadAction<SkillData[]>) => {
            state.resumeDraft.skills = action.payload
        },
        

        // jobs
        addJob: (state, action: PayloadAction<string>) => { // PayloadAction<string> = id
            state.resumeDraft.jobs.push({id: action.payload, company: '', position: '', dateFrom: ''})
        },
        updateJob: (state, action: PayloadAction<JobData>) => {
            state.resumeDraft.jobs = state.resumeDraft.jobs.map(
                (item) => item.id === action.payload.id ? action.payload : item
            )
        },
        deleteJob: (state, action: PayloadAction<string>) => {
            state.resumeDraft.jobs = state.resumeDraft.jobs.filter(
                (item) => item.id !== action.payload
            )
        },

        // projects
        addProject: (state, action: PayloadAction<string>) => {
            state.resumeDraft.projects.push({id: action.payload, title: '', link: '', description: ''})
        },
        updateProject: (state, action: PayloadAction<ProjectData>) => {
            state.resumeDraft.projects = state.resumeDraft.projects.map(
                (item) => item.id === action.payload.id ? action.payload : item
            )
        },
        deleteProject: (state, action: PayloadAction<string>) => {
            state.resumeDraft.projects = state.resumeDraft.projects.filter(
                (item) => item.id !== action.payload
            )
        },

        // education
        addEducation: (state, action: PayloadAction<string>) => {
            state.resumeDraft.education.push({
                id: action.payload, org: '', faculty: '', program: '', dateFrom: '', grade: 'bachelor', city: ''
            })
        },
        updateEducation: (state, action: PayloadAction<EducationData>) => {
            state.resumeDraft.education = state.resumeDraft.education.map(
                (item) => item.id === action.payload.id ? action.payload : item
            )
        },
        deleteEducation: (state, action: PayloadAction<string>) => {
            state.resumeDraft.education = state.resumeDraft.education.filter(
                (item) => item.id !== action.payload
            )
        },

        // languages
        addLanguage: (state, action: PayloadAction<string>) => {
            state.resumeDraft.langs.push({
                id: action.payload, language: '', level: 'a1',
            })
        },
        updateLanguage: (state, action: PayloadAction<LanguageData>) => {
            state.resumeDraft.langs = state.resumeDraft.langs.map(
                (item) => item.id === action.payload.id ? action.payload : item
            )
        },
        deleteLanguage: (state, action: PayloadAction<string>) => {
            state.resumeDraft.langs = state.resumeDraft.langs.filter(
                (item) => item.id !== action.payload
            )
        }
    },
})

export const { actions: resumeActions } = resumeSlice;
export const { reducer: resumeReducer } = resumeSlice;