import { Currency } from "entities/Currency";
import { TypeOfEmplValue } from "entities/TypeOfEmpl";


import { 
    PersonalDataErrors, 
    ContactsDataErrors, 
    AboutMeDataErrors, 
    ObjectiveDataErrors, 
    SkillsDataErrors, 
    JobsDataErrors, 
    ProjectsDataErrors, 
    EducationDataErrors, 
    LanguagesDataErrors,
} from "./resumeValidationSchema";

export interface ResumeSchema {
    currentId?: string;
    resumeIds: {id: string, objective: Partial<ObjectiveData>, updatedAt?: string, createdAt: string, prevImg?: string}[];
    resumeIdsStatus: 'isLoading' | 'idle' | 'succeeded' | 'failed';
    resumeDraft: Resume;
    resumeDraftStatus: 'isLoading' | 'idle' | 'succeeded' | 'failed' | 'validating';
    error?: string;
}

export interface Resume {
    id: string;
    prevImg?: string;
    personal: PersonalData,
    contacts: ContactsData,
    objective: ObjectiveData,
    aboutMe: string;
    skills: string[];
    jobs: JobData[];
    projects: ProjectData[];
    education: EducationData[];
    langs: LanguageData[];
    valErrors: ValidationErrors;
    createdAt: string;
    updatedAt?: string;
};

// main info

export interface PersonalData {
    firstname: string;
    lastname: string;
    patronymic?: string;
    birthdate?: string;
    photo?: string;
    sex: 'male' | 'female';
    citizenship: string;
    country: string;
    city: string;
}

// contacts

export interface ContactsData {
    email: string;
    phone?: string;
    links: ContactLink[];
    preferred?: string; //  'email' | 'phone' or link id
}

export interface ContactLink {
    id: string;
    title: string;
    link: string;
}

// search options

export interface ObjectiveData {
    positions: Position[];
    typeOfEmpl: TypeOfEmplValue[];
    format: 'office' | 'remote' | 'hybrid' | 'any';
    salary?: string;
    currency: Currency;
    readyToRelocate: boolean;
    readyToBTrip: boolean;
    workweek?: string;
}


export interface Position {
    id: string;
    name: string;
}


// jobData

export interface JobData {
    id: string;
    position: string;
    company: string;
    location?: string;
    dateFrom: string;
    dateTo?: string;
    comment?: string;
}

// projectsData

export interface ProjectData {
    id: string;
    title: string;
    link: string;
    description?: string;
}

// educatiuonData

export interface EducationData {
    id: string;
    faculty: string;
    program: string;
    grade: 'bachelor' | 'master' | 'phd' | 'ad_fe' | 'specialist';
    org: string;
    city: string;
    dateFrom: string;
    dateTo?: string;
}

// languagesData

export interface LanguageData {
    id: string;
    language: string;
    level?: 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2';
}

export interface ValidationErrors {
    personal: PersonalDataErrors;
    contacts: ContactsDataErrors;
    aboutMe: AboutMeDataErrors;
    objective: ObjectiveDataErrors;
    skills?: SkillsDataErrors;
    jobs: JobsDataErrors;
    projects: ProjectsDataErrors;
    education: EducationDataErrors;
    languages: LanguagesDataErrors;
}