import { isEmpty, isShorterThan } from "shared/lib/validation/validation";
import { EducationData } from "../../types/ResumeSchema";
import { EducationDataErrors, EducationErrorTypes, ErrorTypes } from "../../types/resumeValidationSchema";
import { isEmptyObj } from "shared/lib/isEmptyObj/isEmptyObj";


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

    errors.id = validateEducationItemField('id', value.id)
    errors.faculty = validateEducationItemField('faculty', value.faculty)
    errors.program = validateEducationItemField('program', value.program)
    errors.grade = validateEducationItemField('grade', value.grade)
    errors.org = validateEducationItemField('org', value.org)
    errors.city = validateEducationItemField('city', value.city)
    errors.dateFrom = validateEducationItemField('dateFrom', value.dateFrom)
    errors.dateTo = validateEducationItemField('dateTo', value.dateTo)

    if (value.dateTo && new Date(value.dateFrom) > new Date(value.dateTo)) value.dateFrom = 'DATE_TO_LESS_THAN_DATE_FROM';

    return Object.values(errors).length > 0 ? errors : undefined
}

const validateEducationData = (data: EducationData[]): EducationDataErrors => {
    return data.reduce<EducationDataErrors>((acc, educationItem) => {
        const educationErrors = validateEducationItem(educationItem);
        if (educationErrors && !isEmptyObj(educationErrors)) {
            acc[educationItem.id] = educationErrors;
        }
        return acc;
    }, {});
}

export const educationDataValidation = {
    validateEducationItemField,
    validateEducationData,
}