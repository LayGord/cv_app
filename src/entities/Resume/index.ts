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
export { getPersonal, getPersonalErrors } from './model/selectors/personalData';
export { getContacts, getContactsErrors } from './model/selectors/contactsData';
export { getAboutMe, getAboutMeErrors} from './model/selectors/aboutMeData';
export { getObjective } from './model/selectors/objectiveData';
export { getSkills } from './model/selectors/skillsData';
export { getJobs} from './model/selectors/jobsData';
export { getProjects } from './model/selectors/projectsData';
export { getEducation } from './model/selectors/educationData';
export { getLanguages } from './model/selectors/languagesData';

export { personalDataValidation } from './model/services/validation/personalData';
export { contactsDataValidation} from './model/services/validation/contactsData';
export { aboutMeValidation } from './model/services/validation/aboutMe';
export { objectiveDataValidation } from './model/services/validation/objectiveData';