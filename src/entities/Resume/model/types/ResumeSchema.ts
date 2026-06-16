import { Currency } from "entities/Currency";
import { 
    PersonalDataErrors, 
    ContactsDataErrors, 
    AboutMeDataErrors, 
    ObjectiveDataErrors, 
    SkillsDataErrors, 
    JobsDataErrros, 
    ProjectsDataErrors, 
    EducationDataErrors, 
    LanguagesDataErrors,
} from "./resumeValidationSchema";

export interface ResumeSchema {
    resumeDraft: Resume;
}

export interface Resume {
    id: string;
    personal: PersonalData,
    contacts: ContactsData,
    objective: ObjectiveData,
    aboutMe: string;
    skills: SkillData[];
    jobs: JobData[];
    projects: ProjectData[];
    education: EducationData[];
    langs: LanguageData[];
    valErrors: ValidationErrors;
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
    typeOfEmpl: TypeOfEmpl[];
    format: 'office' | 'remote' | 'hybrid' | 'any';
    salary?: string;
    currency: Currency;
    readyToRelocate: boolean;
    readyToBTrip: boolean;
    workweek?: string;
}


export interface TypeOfEmpl {
    id: string;
    displayName: string;
    value: 'fulltime' | 'partial' | 'internship' | 'watch'
};


export interface Position {
    id: string;
    name: string;
}


// experience info

export interface SkillData {
    id: string; // here id goes as value;
    displayName: string;
    category?: string;
}


export interface JobData {
    id: string;
    position: string;
    company: string;
    location?: string;
    dateFrom: string;
    dateTo?: string;
    comment?: string;
}


export interface ProjectData {
    id: string;
    title: string;
    link: string;
    description?: string;
}


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
    skills: SkillsDataErrors;
    jobs: JobsDataErrros;
    projects: ProjectsDataErrors;
    education: EducationDataErrors;
    languages: LanguagesDataErrors;
}