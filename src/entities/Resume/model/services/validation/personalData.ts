import { PersonalData } from "../../types/ResumeSchema";
import { PersonalDataErrors, ErrorTypes } from "../../types/resumeValidationSchema";
import { isEmpty, isShorterThan } from "shared/lib/validation/validation";


const validatePersonalDataField = (
    field: keyof PersonalData, value: PersonalData[keyof PersonalData]
): ErrorTypes | undefined => {
    switch (field) {

    case 'lastname':
        if (!value || isEmpty(value)) return 'REQUIRED';
        if (isShorterThan(value, 2))  return 'TOO_SHORT';
        return;

    case 'firstname':
        if (!value || isEmpty(value)) return 'REQUIRED';
        if (isShorterThan(value, 2)) return 'TOO_SHORT';
        return;

    case 'patronymic':
        if (!value) return;
        if (value && !isEmpty(value) && isShorterThan(value, 2)) return 'TOO_SHORT';
        return;

    case 'birthdate':
        if (!value) return;
        if (!value && !isEmpty(value)) return 'INVALID_DATE'
        return;
        
        // case 'photo':

    case 'sex':
        if (!value || isEmpty(value)) return 'REQUIRED'
        return;

    case 'citizenship':
        if (!value) return;
        if (value && !isEmpty(value) && isShorterThan(value, 2)) return 'TOO_SHORT'
        return;

    case 'country':
        if (!value) return;
        if (value && !isEmpty(value) && isShorterThan(value, 2)) return 'TOO_SHORT'
        return;

    case 'city':
        if (!value) return;
        if (value && !isEmpty(value) && isShorterThan(value, 2)) return 'TOO_SHORT'
        return;
    }
};

const validatePersonalData = (data: PersonalData): PersonalDataErrors => {
    const errors: PersonalDataErrors = {};

    const fields = Object.keys(data);
    fields.forEach((field) => {
        const error = validatePersonalDataField(field as keyof PersonalData, data[field as keyof PersonalData]);

        if (error) {
            errors[field as keyof PersonalDataErrors] = error
        }
    })

    return errors;
};

export const personalDataValidation = {
    validatePersonalDataField,
    validatePersonalData,
};