import { isEmpty, isShorterThan } from "shared/lib/validation/validation";
import { LanguageData } from "../../types/ResumeSchema";
import { ErrorTypes, LanguagesDataErrors, LanguagesErrorTypes } from "../../types/resumeValidationSchema";
import { isEmptyObj } from "shared/lib/isEmptyObj/isEmptyObj";


const validateLanguageItemField = (
    field: keyof LanguageData, value?: string
): ErrorTypes | undefined => {
    switch (field) {
    case 'id':
        if (!value || isEmpty(value)) return 'REQUIRED';
        return;
    case 'language': 
        if (!value || isEmpty(value)) return 'REQUIRED';
        if (isShorterThan(value, 2 )) return 'TOO_SHORT';
        return;
    case 'level': 
        if (!value || isEmpty(value)) return 'REQUIRED';
        return;
    };
};

const validateLanguageItem = (
    value: LanguageData
): LanguagesErrorTypes | undefined => {
    const errors: LanguagesErrorTypes = {};

    errors.id = validateLanguageItemField('id', value.id)
    errors.language = validateLanguageItemField('language', value.language)
    errors.level = validateLanguageItemField('level', value.level)

    return Object.values(errors).length > 0 ? errors : undefined
}

const validateLanguageData = (data: LanguageData[]): LanguagesDataErrors => {
    return data.reduce<LanguagesDataErrors>((acc, languageItem) => {
        const languageErrors = validateLanguageItem(languageItem);
        if (languageErrors && !isEmptyObj(languageErrors)) {
            acc[languageItem.id] = languageErrors;
        }
        return acc;
    }, {});
}

export const languagesDataValidation = {
    validateLanguageItemField,
    validateLanguageData,
}