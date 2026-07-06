import { SkillData } from "entities/Skill";
import { ContactLink, EducationData, JobData, LanguageData, Position, ProjectData } from "./ResumeSchema"
import { TypeOfEmpl } from "entities/TypeOfEmpl";


export type ErrorTypes =
  | 'REQUIRED'
  | 'TOO_SHORT'
  | 'INVALID_DATE'
  | 'INVALID_PHOTO'
  | 'INVALID_EMAIL'
  | 'INVALID_PHONE'
  | 'INVALID_LINK'
  | 'LESS_THAN_ZERO'
  | 'IS_NAN'
  | 'DATE_TO_LESS_THAN_DATE_FROM'

export interface ItemErrorsPayload<T> {
    id: string;
    field: keyof T;
    error?: ErrorTypes;
};

export interface PersonalDataErrors {
    firstname?: ErrorTypes
    lastname?: ErrorTypes
    patronymic?: ErrorTypes
    birthdate?: ErrorTypes
    photo?: ErrorTypes
    sex?: ErrorTypes
    citizenship?: ErrorTypes
    country?: ErrorTypes
    city?: ErrorTypes
};

// contactsData

export type LinkErrorTypes = { [K in keyof ContactLink]?: ErrorTypes };
export type LinkErrors = Record<string, LinkErrorTypes>;

export interface ContactsDataErrors {
    email?: ErrorTypes;
    phone?: ErrorTypes;
    links?: LinkErrors;
    preferred?: ErrorTypes;
};

// aboutMeData

export interface AboutMeDataErrors {
    aboutMe?: ErrorTypes
};

// objectiveData

export type PositionErrorTypes = {[K in keyof Position]?: ErrorTypes};
export type PositionErrors = Record<string, PositionErrorTypes>;

export type TypeOfEmplErrorTypes = {[K in keyof TypeOfEmpl]?: ErrorTypes}; // or 'empty': {id: '', name: ''}
export type TypeOfEmplErrors = Record<string, TypeOfEmplErrorTypes>;

export interface ObjectiveDataErrors {
    positions?: PositionErrors;
    typeOfEmpl?: ErrorTypes;
    format?: ErrorTypes
    salary?: ErrorTypes;
    currency?: ErrorTypes;
    readyToRelocate?: ErrorTypes;
    readyToBTrip?: ErrorTypes;
    workweek?: ErrorTypes;
}

// skillData
export type SkillsDataErrorTypes = {[K in keyof SkillData]?: ErrorTypes};
export type SkillsDataErrors = Record<string, SkillsDataErrorTypes>;

// jobData
export type JobErrorTypes = { [K in keyof JobData]?: ErrorTypes };
export type JobsDataErrors = Record<string, JobErrorTypes>;

// projectsData 
export type ProjectErrorTypes = { [K in keyof ProjectData]?: ErrorTypes };
export type ProjectsDataErrors = Record<string, ProjectErrorTypes>;

// educationsData
export type EducationErrorTypes = { [K in keyof EducationData]?: ErrorTypes };
export type EducationDataErrors = Record<string, EducationErrorTypes>;

// languagesData
export type LanguagesErrorTypes = { [K in keyof LanguageData]?: ErrorTypes };
export type LanguagesDataErrors = Record<string, LanguagesErrorTypes>;
