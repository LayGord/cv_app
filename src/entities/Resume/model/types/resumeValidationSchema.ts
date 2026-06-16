import { ContactLink } from "./ResumeSchema"

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

export interface LinkErrorsPayload {
    id: string;
    field: keyof ContactLink;
    error?: ErrorTypes;
}

export type LinkErrorTypes = { [K in keyof ContactLink]?: ErrorTypes}

export type LinkErrors = Record<string, LinkErrorTypes>

export interface ContactsDataErrors {
    email?: ErrorTypes;
    phone?: ErrorTypes;
    links?: LinkErrors;
    preferred?: ErrorTypes;
}

// aboutMeData

export interface AboutMeDataErrors {
    aboutMe?: ErrorTypes
}

export interface TypeOfEmplErrorTypes {
    displayName?: ErrorTypes;
    value?: ErrorTypes
};

export interface PositionErrorTypes {
    name?: ErrorTypes;
}

export type TypeOfEmplErrors = Record<string, TypeOfEmplErrorTypes | undefined>
export type PositionErrors = Record<string, PositionErrorTypes | undefined>

export interface ObjectiveDataErrors {
    positions?: PositionErrors;
    typeOfEmpl?: TypeOfEmplErrors;
    format?: ErrorTypes
    salary?: ErrorTypes;
    currency?: ErrorTypes;
    readyToRelocate?: ErrorTypes;
    readyToBTrip?: ErrorTypes;
    workweek?: ErrorTypes;
}

export interface SkillsDataErrorTypes {
    id?: ErrorTypes;
    displayName?: ErrorTypes;
    category?: ErrorTypes;
}

export type SkillsDataErrors = Record<string, SkillsDataErrorTypes | undefined>

export interface JobsDataErrros {}
export interface ProjectsDataErrors {}
export interface EducationDataErrors {}
export interface LanguagesDataErrors {}