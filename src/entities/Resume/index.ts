export type {
    ResumeSchema, 
    Resume,
    PersonalData,
    ContactsData, ContactLink,
    ObjectiveData, Position,
    JobData, 
    EducationData, 
    ProjectData, 
    LanguageData,
    ValidationErrors
} from './model/types/ResumeSchema';

export type {
    LinkErrorTypes,
    PositionErrorTypes,
    JobErrorTypes,
    ProjectErrorTypes,
    EducationErrorTypes,
    LanguagesErrorTypes,
} from './model/types/resumeValidationSchema';

export { resumeReducer, resumeActions } from './model/slice/resumeSlice';

export { 
    getResume, getResumeDraft, getResumeErrors, getResumeIds, getResumeIsLoading, getResumeIsValidating, getResumeCurrentId
} from './model/selectors/resumeData';
export { getPersonal, getPersonalErrors } from './model/selectors/personalData';
export { getContacts, getContactsErrors } from './model/selectors/contactsData';
export { getAboutMe, getAboutMeErrors} from './model/selectors/aboutMeData';
export { getObjective, getObjectiveErrors } from './model/selectors/objectiveData';
export { getSkills, getSkillsErrors } from './model/selectors/skillsData';
export { getJobs, getJobsErrors } from './model/selectors/jobsData';
export { getProjects, getProjectsErrors } from './model/selectors/projectsData';
export { getEducation, getEducationErrors } from './model/selectors/educationData';
export { getLanguages, getLanguagesErrors } from './model/selectors/languagesData';

export { personalDataValidation } from './model/services/validation/personalData';
export { contactsDataValidation} from './model/services/validation/contactsData';
export { aboutMeValidation } from './model/services/validation/aboutMe';
export { objectiveDataValidation } from './model/services/validation/objectiveData';
export { jobsDataValidation } from './model/services/validation/jobsData';
export { projectsDataValidation } from './model/services/validation/projectsData';
export { educationDataValidation } from './model/services/validation/educationData';
export { languagesDataValidation } from './model/services/validation/languagesData';
export { validateResumeData } from './model/services/validation/validateResumeData';

export { fetchResumeIds } from './model/services/fetchResumeIds/fetchResumeIds';
export { fetchResumeById } from './model/services/fetchResumeById/fetchResumeById';
export { updateResume } from './model/services/updateResume/updateResume';
export { deleteResumeById } from './model/services/deleteResumeById/deleteResumeById';

export { ResumeCard } from './ui/ResumeCard/ResumeCard';