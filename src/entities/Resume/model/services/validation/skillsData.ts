import { SkillData } from "../../types/ResumeSchema";
import { SkillsDataErrors, SkillsDataErrorTypes } from "../../types/resumeValidationSchema";
import { isEmpty, isShorterThan } from "shared/lib/validation/validation";


const validateSkillsDataItem = (data: SkillData): SkillsDataErrors | undefined => {
    const errors: SkillsDataErrorTypes = { };

    if (!data.id) errors.id = 'REQUIRED';
    if (!data.displayName || isEmpty(data.displayName)) errors.displayName = 'REQUIRED';
    if (data.category && !isEmpty(data.category) && isShorterThan(data.category, 2)) errors.category = 'TOO_SHORT';
    
    return Object.entries(errors).length > 0 ? { [data.id]: errors } : undefined;
}

const validateSkillsData = (data: SkillData[]): SkillsDataErrors | undefined => {

    let errors: SkillsDataErrors = {};

    data.forEach(skill => {
        const skillErrors = validateSkillsDataItem(skill);
        if (skillErrors) errors = { ...errors, ...skillErrors};
    })

    return errors;
}

export const skillsDataValidation = {
    validateSkillsDataItem,
    validateSkillsData,
};