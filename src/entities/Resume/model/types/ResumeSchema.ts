import { Currency } from "entities/Currency";

export interface ResumeSchema {
    resumeDraft: Resume;
}

export interface Resume {
    id: string;
    personal: PersonalData,
    contacts: ContactsData,
    objective: ObjectiveData,
    experience: ExperienceData,
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
    currency?: Currency;
    readyToRelocate?: boolean;
    readyToBTrip?: boolean;
    workweek?: string;
}


interface TypeOfEmpl {
    id: string;
    displayName: string;
    value: 'fulltime' | 'partial' | 'internship' | 'watch'
};


export interface Position {
    id: string;
    name: string;
}


// experience info

export interface ExperienceData {
    skills: Skill[];
    jobs: Job[];
    projects: Project[];
    education: Education[];
    langs: Language[]
}


export interface Skill {
    id: string;
    displayName: string;
    category?: string;
}


export interface Job {
    id: string;
    position: string;
    company: string;
    location?: string;
    dateFrom: string;
    dateTo?: string;
    comment?: string;
}


export interface Project {
    id: string;
    title: string;
    link: string;
    description?: string;
}


export interface Education {
    id: string;
    faculty: string;
    program: string;
    grade: 'bachelor' | 'master' | 'phd' | 'ad_fe' | 'specialist';
    org: string;
    dateFrom: string;
    dateTo?: string;
}


export interface Language {
    id: string;
    language: string;
    level?: 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2';
}