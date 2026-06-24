import { isEmpty, isShorterThan } from "shared/lib/validation/validation";
import { EducationData } from "../../types/ResumeSchema";
import { EducationDataErrors, EducationErrorTypes, ErrorTypes } from "../../types/resumeValidationSchema";


const validateEducationItemField = (
    field: keyof EducationData, value?: string
): ErrorTypes | undefined => {
    switch (field) {
    case 'id':
        if (!value || isEmpty(value)) return 'REQUIRED';
        return;
    case 'faculty':
        if (!value || isEmpty(value)) return 'REQUIRED';
        if (isShorterThan(value, 2)) return 'TOO_SHORT';
        return;
    case 'program': 
        if (!value || isEmpty(value)) return 'REQUIRED';
        if (isShorterThan(value, 2)) return 'TOO_SHORT';
        return;
    case 'grade': 
        if (!value || isEmpty(value)) return 'REQUIRED';
        return;
    case 'org':
        if (!value || isEmpty(value)) return 'REQUIRED';
        if (isShorterThan(value, 2)) return 'TOO_SHORT';
        return;
    case 'city':
        if (!value || isEmpty(value)) return 'REQUIRED';
        if (isShorterThan(value, 2)) return 'TOO_SHORT';
        return;
    case 'dateFrom':
        if (!value) return 'REQUIRED';
        return;
    case 'dateTo':
        if (!value) return;
        return;
    };

};

const validateEducationItem = (
    value: EducationData
): EducationErrorTypes | undefined => {
    const errors: EducationErrorTypes = {};

    errors.id = validateEducationItemField('id', errors.id)
    errors.faculty = validateEducationItemField('faculty', errors.faculty)
    errors.program = validateEducationItemField('program', errors.program)
    errors.grade = validateEducationItemField('grade', errors.grade)
    errors.org = validateEducationItemField('org', errors.org)
    errors.city = validateEducationItemField('city', errors.city)
    errors.dateFrom = validateEducationItemField('dateFrom', errors.dateFrom)
    errors.dateTo = validateEducationItemField('dateTo', errors.dateTo)

    if (value.dateTo && new Date(value.dateFrom) > new Date(value.dateTo)) errors.dateFrom = 'DATE_TO_LESS_THAN_DATE_FROM';

    return Object.values(errors).length > 0 ? { [value.id]: errors} : undefined
}

const validateEducationData = (data: EducationData[]): EducationDataErrors => {
    return data.reduce<EducationDataErrors>((acc, educationItem) => {
        const educationErrors = validateEducationItem(educationItem);
        if (educationErrors) {
            acc[educationItem.id] = educationErrors;
        }
        return acc;
    }, {});
}

export const educationDataValidation = {
    validateEducationItemField,
    validateEducationData,
}