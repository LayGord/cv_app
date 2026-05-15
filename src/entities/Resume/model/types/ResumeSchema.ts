export interface ResumeSchema {
    id: string;
    resumeDraft: Resume;
}

export interface Resume {
    personal: ResumePersonalData;
    contacts: ResumeContactsData;
    experience: ResumeExperienceData;
}

export interface ResumePersonalData {
    firstname: string;
    lastname: string;
    patronymic?: string;
    birthdate?: string;
    photo?: string;
    sex: string;
    citizenship: string;
    country: string;
    city: string;
}

export interface ResumeContactsData {
    email: string;
    phone?: string;
    others?: ContactLink[];
}

export interface ResumeExperienceData {
    skills?: Skill[];
    jobs?: Job[];
    projects?: Project[];
    educations?: Education[];
    langs?: Language[]
}


interface ContactLink {
    title: string;
    link: string;
}


interface Skill {
    id: string;
    displayName: string;
    category?: string;
}


interface Job {
    id: string;
    position: string;
    company: string;
    location: string;
    dateFrom: string;
    dateTo?: string;
    comment: string;
}


interface Project {
    id: string;
    title: string;
    link: string;
    description: string;
}


interface Education {
    id: string;
    grade: 'Bachelor' | 'Master' | 'PhD' | 'Lower post-secondary';
    completed: boolean;
    org: string;
    dateFrom: string;
    dateTo?: string;
}


interface Language {
    id: string;
    language: string;
    level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}