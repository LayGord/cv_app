import { SkillsDataErrors } from "../../types/resumeValidationSchema";


const validateSkillsData = (data?: string[]): SkillsDataErrors | undefined => {
    if (!data) return { 'empty': { id: 'REQUIRED'} };
    return;
}

export const skillsDataValidation = {
    validateSkillsData,
};