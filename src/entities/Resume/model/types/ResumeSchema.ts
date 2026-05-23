export interface ResumeSchema {
    id: string;
    resumeDraft: Resume;
}

export interface Resume {
    personal: ResumePersonalData,
    contacts: ResumeContactsData,
    experience: ResumeExperienceData,
};

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
    links: ContactLink[];
}

export interface ResumeExperienceData {
    skills: Skill[];
    jobs: Job[];
    projects: Project[];
    educations: Education[];
    langs: Language[]
}


export interface ContactLink {
    id: string;
    title: string;
    link: string;
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