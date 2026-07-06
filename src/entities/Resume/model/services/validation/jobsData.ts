import { isEmpty, isShorterThan } from "shared/lib/validation/validation";
import { JobData } from "../../types/ResumeSchema";
import { ErrorTypes, JobErrorTypes, JobsDataErrors } from "../../types/resumeValidationSchema";
import { isEmptyObj } from "shared/lib/isEmptyObj/isEmptyObj";



const validateJobItemField = (
    field: keyof JobData, value?: string
): ErrorTypes | undefined => {
    switch (field) {
    case 'id':
        if (!value || isEmpty(value)) return 'REQUIRED';
        return;
    case 'position':
        if (!value || isEmpty(value)) return 'REQUIRED';
        return;
    case 'company':
        if (!value || isEmpty(value)) return 'REQUIRED';
        if(isShorterThan(value, 2)) return 'TOO_SHORT';
        return;
    case 'location':
        if (!value) return;
        if (value && isShorterThan(value, 2)) return 'TOO_SHORT';
        return;
    case 'dateFrom':
        if (!value || !isEmpty(value)) return 'REQUIRED';
        if (Number.isNaN(Date.parse(value))) return 'INVALID_DATE'
        return;
    case 'dateTo':
        if (!value) return;
        if (Number.isNaN(Date.parse(value))) return 'INVALID_DATE'
        return;
    case 'comment':
        if (!value) return;
        if (isShorterThan(value, 2) || isEmpty(value)) return 'TOO_SHORT';
        return;
    };

};

const validateJobItem = (
    value: JobData
): JobErrorTypes | undefined => {
    const errors: JobErrorTypes = { };

    errors.id = validateJobItemField('id', value.id);
    errors.position = validateJobItemField('position', value.position)
    errors.company = validateJobItemField('company', value.company)
    errors.location = validateJobItemField('location', value.location)
    errors.dateFrom = validateJobItemField('dateFrom', value.dateFrom)
    errors.dateTo = validateJobItemField('dateTo', value.dateTo)
    
    if (value.dateTo && new Date(value.dateFrom) > new Date(value.dateTo)) errors.dateFrom = 'DATE_TO_LESS_THAN_DATE_FROM';

    return Object.values(errors).length > 0 ? errors: undefined
}

const validateJobsData = (data: JobData[]): JobsDataErrors => {
    return data.reduce<JobsDataErrors>((acc, jobItem) => {
        const jobErrors = validateJobItem(jobItem);
        if (jobErrors && !isEmptyObj(jobErrors)) {
            acc[jobItem.id] = jobErrors;
        }
        return acc;
    }, {});
}

export const jobsDataValidation = {
    validateJobItemField,
    validateJobsData,
}