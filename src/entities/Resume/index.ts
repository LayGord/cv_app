export type {
    ResumeSchema, 
    Resume,
    PersonalData,
    ContactsData, ContactLink,
    ObjectiveData, Position,
    SkillData, 
    JobData, 
    EducationData, 
    ProjectData, 
    LanguageData,
} from './model/types/ResumeSchema';
export { resumeReducer, resumeActions } from './model/slice/resumeSlice';
export { getPersonal } from './model/selectors/personalData/getPersonal';
export { getPersonalErrors } from './model/selectors/personalData/getPersonalErrors';
export { getContacts } from './model/selectors/getContacts';
export { getObjective } from './model/selectors/getObjective';
export { getSkills } from './model/selectors/getSkills';
export { getJobs} from './model/selectors/getJobs';
export { getProjects } from './model/selectors/getProjects';
export { getEducation } from './model/selectors/getEducation';
export { getLanguages } from './model/selectors/getLanguages';

export { validatePersonalData, validatePersonalDataField } from './model/services/validation/personalData';