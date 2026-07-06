import { isEmpty, isNumber, isShorterThan } from "shared/lib/validation/validation";
import { ObjectiveData, Position } from "../../types/ResumeSchema";
import { TypeOfEmpl, TypeOfEmplValue } from "entities/TypeOfEmpl";

import { 
    ErrorTypes, 
    ObjectiveDataErrors, 
    TypeOfEmplErrors, 
} from "../../types/resumeValidationSchema";
import { isEmptyObj } from "shared/lib/isEmptyObj/isEmptyObj";


const validateObjectiveDataField = (
    field: Omit<keyof ObjectiveData, 'typeOfEmpl' | 'positions'>, value?: string
): ErrorTypes | undefined => {
    switch (field) {

    case 'format':
        if (!value || isEmpty(value as string)) return 'REQUIRED';
        return;

    case 'salary':
        if (!value) return;
        if (!isEmpty(value) && !isNumber(value)) return 'IS_NAN';
        if (!isEmpty(value) && Number(value) < 0) return 'LESS_THAN_ZERO';
        return;

    case 'currency':
        if (!value || isEmpty(value)) return 'REQUIRED';
        return;

    case 'readyToRelocate':
        if (value === undefined) return 'REQUIRED';
        return;

    case 'readyToBTrip':
        if (value === undefined) return 'REQUIRED';
        return;

    case 'workweek':
        if (!value) return;
        if (!isEmpty(value) && !isNumber(value)) return 'IS_NAN';
        if (!isEmpty(value) && Number(value) < 0) return 'LESS_THAN_ZERO';
        return;
    }

}

// basically you cant manipulate with typeOfEmpl fields, only choose one of. So, mostly, this is for safety 
const validatePositionItemField = (
    field: keyof Position, value: string
): ErrorTypes | undefined => {
    switch (field) {

    case 'id':
        if (!value || isShorterThan(value, 2)) return 'REQUIRED'
        return;

    case 'name':
        if (!value || isEmpty(value)) return 'REQUIRED';
        if (isShorterThan(value, 2)) return 'TOO_SHORT';
        return;

    };
};

const validateTypeOfEmplField = ( // not really needed, just 4 safety
    field: keyof TypeOfEmpl, value: string
): ErrorTypes | undefined => {
    switch (field) {

    case 'id':
        if (!value || isShorterThan(value, 2)) return 'REQUIRED'
        return;

    case 'displayName':
        if (!value || isEmpty(value)) return 'REQUIRED';
        if (isShorterThan(value, 2)) return 'TOO_SHORT';
        return;

    case 'value':
        if (!value || isEmpty(value)) return 'REQUIRED';
        if (isShorterThan(value, 2)) return 'TOO_SHORT';
        return;

    };
}

const validateTypeOfEmpl = (data: TypeOfEmplValue[]): ErrorTypes | undefined => {
    if (data.length === 0) return 'REQUIRED';
    return;
};

const validateObjectiveData = (data: ObjectiveData): ObjectiveDataErrors | undefined => {
    const errors: ObjectiveDataErrors = { };

    data.positions.forEach(position => {
        const valErr = validatePositionItemField('name', position.name);
        if (valErr) {
            errors['positions'] = {...errors['positions'], [position.id]: { 'name': valErr }}
        }
    });

    errors.typeOfEmpl = validateTypeOfEmpl(data.typeOfEmpl);

    Object.entries(data).forEach(([key, value]) => {
        if (key !== 'typeOfEmpl' && key !== 'positions' ) {
            errors[key as keyof Omit<ObjectiveDataErrors, 'typeOfEmpl' | 'positions'>] = validateObjectiveDataField(key, value);
        }
    });
    console.log(errors)
    return isEmptyObj(errors) ? undefined : errors;
}

export const objectiveDataValidation = {
    validateObjectiveDataField,
    validatePositionItemField,
    validateTypeOfEmplField,
    validateTypeOfEmpl,
    validateObjectiveData,
};