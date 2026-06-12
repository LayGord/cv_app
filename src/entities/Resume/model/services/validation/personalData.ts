import { PersonalData } from "../../types/ResumeSchema";
import { PersonalDataErrors, PersonalDataErrorTypes } from "../../types/resumeValidationSchema";
import { isEmpty, isShorterThan } from "shared/lib/validation/validation";


export const validatePersonalDataField = (
    field: keyof PersonalData, value: PersonalData[keyof PersonalData]
): PersonalDataErrorTypes | undefined => {
    switch (field) {

    case 'lastname':
        if (!value || isEmpty(value)) return 'REQUIRED'
        if (isShorterThan(value, 2))  return 'TOO_SHORT'
        return;

    case 'firstname':
        if (!value || isEmpty(value)) return 'REQUIRED'
        if (isShorterThan(value, 2)) return 'TOO_SHORT'
        return;

    case 'patronymic':
        if (value && !isEmpty(value) && isShorterThan(value, 2)) return 'TOO_SHORT'
        return;

    case 'birthdate':
        if (!value && !isEmpty(value)) return 'INVALID_DATE'
        return;
        
        // case 'photo':

    case 'sex':
        if (!value) return 'REQUIRED'
        return;

    case 'citizenship':
        if (value && !isEmpty(value) && isShorterThan(value, 2)) return 'TOO_SHORT'
        return;

    case 'country':
        if (value && !isEmpty(value) && isShorterThan(value, 2)) return 'TOO_SHORT'
        return;

    case 'city':
        if (value && !isEmpty(value) && isShorterThan(value, 2)) return 'TOO_SHORT'
        return;
    }
};

export const validatePersonalData = (data: PersonalData): PersonalDataErrors => {
    const errors: PersonalDataErrors = {};

    const fields = Object.keys(data);
    fields.forEach((field) => {
        const error = validatePersonalDataField(field as keyof PersonalData, data[field as keyof PersonalData]);

        if (error) {
            errors[field as keyof PersonalDataErrors] = error
        }
    })

    return errors;
}