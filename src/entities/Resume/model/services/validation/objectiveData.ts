import { ObjectiveData, TypeOfEmpl } from "../../types/ResumeSchema";
import { ErrorTypes, ObjectiveDataErrors, PositionErrors, TypeOfEmplErrors, TypeOfEmplErrorTypes} from "../../types/resumeValidationSchema";
import { isEmpty, isNumber, isShorterThan } from "shared/lib/validation/validation";


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
        if (!value || isEmpty(value)) return 'REQUIRED';
        return;

    case 'readyToBTrip':
        if (!value || isEmpty(value)) return 'REQUIRED';
        return;

    case 'workweek':
        if (!value) return;
        if (!isEmpty(value) && !isNumber(value)) return 'IS_NAN';
        if (!isEmpty(value) && Number(value) < 0) return 'LESS_THAN_ZERO';
        return;
    }

}

// basically you cant manipulate with typeOfEmpl fields, only choose one of. So, mostly, this is for safety 
const validateTypeOfEmplItem = ( value: TypeOfEmpl ): TypeOfEmplErrors | undefined => { 
    const errors: TypeOfEmplErrorTypes = { };

    if (!value.displayName || isEmpty(value.displayName)) errors.displayName = 'REQUIRED';
    if (!value.value || isEmpty(value.displayName)) errors.displayName = 'REQUIRED';

    return Object.entries(errors).length > 0 ? { [value.id]: errors } : undefined;
};

const validatePosition = (
    value: string
): ErrorTypes | undefined => {
    if (!value || isEmpty(value)) return 'REQUIRED';
    if (isShorterThan(value, 2)) return 'TOO_SHORT';
    return;
};

const validateObjectiveData = (data: ObjectiveData): ObjectiveDataErrors => {
    const errors: ObjectiveDataErrors = {};

    Object.entries(data).forEach(([key, value]) => {
        if (key !== 'typeOfEmpl' && key !== 'positions' ) {
            errors[key as keyof Omit<ObjectiveDataErrors, 'typeOfEmpl' | 'positions'>] = validateObjectiveDataField(key, value);
        }
    });

    if (data.positions) {
        errors.positions = data.positions.reduce((acc: PositionErrors, position) => {
            acc[position.id] = { name: validatePosition(position.name)}
            return acc
        }, {})
    }

    if (data.typeOfEmpl) {
        errors.typeOfEmpl = data.typeOfEmpl.reduce((acc: TypeOfEmplErrors, typeOfEmpl) => {
            acc[typeOfEmpl.id] = validateTypeOfEmplItem(typeOfEmpl)
            return acc
        }, {})
    }
    
    return errors;
}

export const objectiveDataValidation = {
    validateObjectiveDataField,
    validateTypeOfEmplItem,
    validatePosition,
    validateObjectiveData,
};