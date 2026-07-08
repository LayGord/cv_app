import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    ResumeSchema,
    PersonalData,
    ContactsData,
    ContactLink,
    ObjectiveData,
    JobData,
    Position,
    EducationData,
    ProjectData,
    LanguageData,
    ValidationErrors,
    Resume,
} from "../types/ResumeSchema";
import {
    EducationDataErrors,
    ErrorTypes,
    ItemErrorsPayload,
    JobsDataErrors,
    LanguagesDataErrors,

    PersonalDataErrors,
    ProjectsDataErrors,
    SkillsDataErrors,

} from "../types/resumeValidationSchema";
import { isEmptyObj } from "shared/lib/isEmptyObj/isEmptyObj";
import { validateResumeData } from "../services/validation/validateResumeData";
import { fetchResumeIds } from "../services/fetchResumeIds/fetchResumeIds";
import { fetchResumeById } from "../services/fetchResumeById/fetchResumeById";
import { updateResume } from "../services/updateResume/updateResume";
import { deleteResumeById } from "../services/deleteResumeById/deleteResumeById";
import { patchResume } from "../services/renameResumeById/renameResumeById";


const initialState: ResumeSchema = {
    resumeIds: [],
    resumeIdsStatus: 'idle',
    resumeDraft: {
        id: '',
        title: 'New resume',
        prevImg: undefined,
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
            links: [{id: '1', title: 'Telegram', link: ''}],
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
        },
        createdAt: '',
    },
    resumeDraftStatus: 'idle',
};


export const resumeSlice = createSlice({
    name: 'resume',
    initialState: initialState,
    reducers: {
        setCurrentId: (state, action: PayloadAction<string | undefined>) => {
            state.currentId = action.payload;
        },
        setResumeTitle: (state, action: PayloadAction<string>) => {
            state.resumeDraft.title = action.payload;
        },
        setPreviewImg: (state, action: PayloadAction<string | undefined>) => {
            state.resumeDraft.prevImg = action.payload;
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
        setContactLinkError: (state, action: PayloadAction<ItemErrorsPayload<ContactLink>>) => {
            const { id, field, error } = action.payload;

            if (!state.resumeDraft.valErrors.contacts.links)
                state.resumeDraft.valErrors.contacts.links = {};

            const mergedContactLinkErr = {
                ...state.resumeDraft.valErrors.contacts.links[id], [field]: error
            };

            if (!error) delete mergedContactLinkErr[field];

            !isEmptyObj(mergedContactLinkErr)
                ? state.resumeDraft.valErrors.contacts.links[id] = mergedContactLinkErr
                : delete state.resumeDraft.valErrors.contacts.links[id];

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
        setPositionError: (state, action: PayloadAction<ItemErrorsPayload<Position>>) => {
            const { id, field, error } = action.payload;

            if (!state.resumeDraft.valErrors.objective.positions)
                state.resumeDraft.valErrors.objective.positions = {};

            const mergedPositionItemErrs = {
                ...state.resumeDraft.valErrors.objective.positions[id], [field]: error 
            };

            if (!error) delete mergedPositionItemErrs[field];

            !isEmptyObj(mergedPositionItemErrs)
                ? state.resumeDraft.valErrors.objective.positions[id] = mergedPositionItemErrs
                : delete state.resumeDraft.valErrors.objective.positions[id];

            if (isEmptyObj(state.resumeDraft.valErrors.objective.positions)) 
                delete state.resumeDraft.valErrors.objective.positions;
        },
        setTypeOfEmplErrors: (state, action: PayloadAction<ErrorTypes | undefined>) => {
            state.resumeDraft.valErrors.objective.typeOfEmpl = action.payload;
        },
        setObjectiveDataFieldError:
        (state, action: PayloadAction<{field: Exclude<keyof ObjectiveData, 'positions' | 'typeOfEmpl'>, error?: ErrorTypes}>) => {
            const { field, error } = action.payload;
            if (error) {
                state.resumeDraft.valErrors.objective[field] = error;
            } else {
                delete state.resumeDraft.valErrors.objective[field]
            }
        },
        // skills
        updateSkillsList: (state, action: PayloadAction<string[]>) => {
            state.resumeDraft.skills = action.payload
        },
        setSkillsErrors: (state, action: PayloadAction<SkillsDataErrors | undefined>) => {
            state.resumeDraft.valErrors.skills = action.payload;
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
            if (state.resumeDraft.valErrors.jobs[action.payload]) {
                delete state.resumeDraft.valErrors.jobs[action.payload];
            };
        },
        setJobItemFieldError: (state, action: PayloadAction<ItemErrorsPayload<JobData>>) => {
            const { id, field, error } = action.payload;

            if (!state.resumeDraft.valErrors.jobs)
                state.resumeDraft.valErrors.jobs = {};

            const mergedJobItemErrs = {
                ...state.resumeDraft.valErrors.jobs[id], [field]: error 
            };

            if (!error) delete mergedJobItemErrs[field];

            !isEmptyObj(mergedJobItemErrs)
                ? state.resumeDraft.valErrors.jobs[id] = mergedJobItemErrs
                : delete state.resumeDraft.valErrors.jobs[id];
        },
        setJobsDataErrors: (state, action: PayloadAction<JobsDataErrors | undefined>) => {
            state.resumeDraft.valErrors.jobs = action.payload || {};
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
            );
            if (state.resumeDraft.valErrors.projects[action.payload]) {
                delete state.resumeDraft.valErrors.projects[action.payload];
            };
        },
        setProjectItemFieldError: (state, action: PayloadAction<ItemErrorsPayload<ProjectData>>) => {
            const { id, field, error } = action.payload;

            if (!state.resumeDraft.valErrors.projects)
                state.resumeDraft.valErrors.projects = {};

            const mergedProjectItemErrs = {
                ...state.resumeDraft.valErrors.projects[id], [field]: error 
            };

            if (!error) delete mergedProjectItemErrs[field];

            !isEmptyObj(mergedProjectItemErrs)
                ? state.resumeDraft.valErrors.projects[id] = mergedProjectItemErrs
                : delete state.resumeDraft.valErrors.projects[id];
        },
        setProjectsDataErrors: (state, action: PayloadAction<ProjectsDataErrors | undefined>) => {
            state.resumeDraft.valErrors.projects = action.payload || {};
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
            );
            if (state.resumeDraft.valErrors.education[action.payload]) {
                delete state.resumeDraft.valErrors.education[action.payload];
            };
        },
        setEducationItemFieldError: (state, action: PayloadAction<ItemErrorsPayload<EducationData>>) => {
            const { id, field, error } = action.payload;

            if (!state.resumeDraft.valErrors.education)
                state.resumeDraft.valErrors.education = {};

            const mergedEducationItemErrs = {
                ...state.resumeDraft.valErrors.education[id], [field]: error 
            };

            if (!error) delete mergedEducationItemErrs[field];

            !isEmptyObj(mergedEducationItemErrs)
                ? state.resumeDraft.valErrors.education[id] = mergedEducationItemErrs
                : delete state.resumeDraft.valErrors.education[id];
        },
        setEducationDataErrors: (state, action: PayloadAction<EducationDataErrors | undefined>) => {
            state.resumeDraft.valErrors.education = action.payload || {};
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
            );
            if (state.resumeDraft.valErrors.languages[action.payload]) {
                delete state.resumeDraft.valErrors.languages[action.payload];
            };
        },
        setLanguageItemFieldError: (state, action: PayloadAction<ItemErrorsPayload<LanguageData>>) => {
            const { id, field, error } = action.payload;

            if (!state.resumeDraft.valErrors.languages)
                state.resumeDraft.valErrors.languages = {};

            const mergedLanguageItemErrs = {
                ...state.resumeDraft.valErrors.languages[id], [field]: error 
            };

            if (!error) delete mergedLanguageItemErrs[field];

            !isEmptyObj(mergedLanguageItemErrs)
                ? state.resumeDraft.valErrors.languages[id] = mergedLanguageItemErrs
                : delete state.resumeDraft.valErrors.languages[id];
        },
        setLanguageDataErrors: (state, action: PayloadAction<LanguagesDataErrors | undefined>) => {
            state.resumeDraft.valErrors.languages = action.payload || {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(validateResumeData.pending, (state) => {
                state.resumeDraftStatus = 'validating';
                state.error = undefined
            })
            .addCase(validateResumeData.fulfilled, (state, action: PayloadAction<ValidationErrors>) => {
                state.resumeDraftStatus = 'succeeded';
                state.resumeDraft.valErrors = action.payload;
            })
            .addCase(validateResumeData.rejected, (state, action) => {
                state.resumeDraftStatus = 'succeeded';
                state.error = action.payload;
            })
            .addCase(fetchResumeIds.pending, (state) => {
                state.resumeIdsStatus = 'isLoading';
                state.error = undefined;
            })
            .addCase(fetchResumeIds.fulfilled, 
                (state, 
                    action: PayloadAction<{
                        id: string, 
                        title: string, 
                        objective: Partial<Resume['objective']>, 
                        createdAt: string, 
                        updatedAt?: string
                    }[]>
                ) => {
                    state.resumeIdsStatus = 'succeeded';
                    state.resumeIds = action.payload
                })
            .addCase(updateResume.pending, (state) => {
                state.resumeIdsStatus = 'isLoading';
                state.error = undefined;
            })
            .addCase(updateResume.fulfilled, (state, action: PayloadAction<Resume>) => {

                const { id, title, objective, createdAt, updatedAt = createdAt, prevImg} = action.payload;

                state.resumeDraftStatus = 'succeeded';
                state.resumeIdsStatus = 'succeeded';
                state.resumeIds.push({id, title, objective, updatedAt, createdAt, prevImg})
            })
            .addCase(deleteResumeById.fulfilled, (state, action: PayloadAction<string> ) => {
                state.resumeIds = state.resumeIds.filter(item => item.id !== action.payload);
                if (state.resumeDraft.id === action.payload) {
                    state.resumeDraft = initialState.resumeDraft;
                }
            })
            .addCase(fetchResumeById.pending, (state) => {
                state.resumeDraftStatus = 'isLoading';
                state.error = undefined
            })
            .addCase(fetchResumeById.fulfilled, (state, action: PayloadAction<Resume>) => {
                state.resumeDraftStatus = 'succeeded';
                state.resumeDraft = action.payload
            })
            .addCase(fetchResumeById.rejected, (state, action) => {
                state.resumeIdsStatus = 'failed';
                state.error = action.payload
            })
            .addCase(patchResume.pending, (state) => {
                state.error = undefined;
                state.resumeIdsStatus = 'isLoading';
            })
            .addCase(patchResume.fulfilled, (state, action: PayloadAction<Resume>) => {
                const { id, title, updatedAt } = action.payload;
                state.error = undefined;
                state.resumeIdsStatus = 'succeeded';
                state.resumeIds = state.resumeIds.map(item => item.id === id ? {...item, title, updatedAt} : item);
            });
    }
    
})

export const { actions: resumeActions } = resumeSlice;
export const { reducer: resumeReducer } = resumeSlice;