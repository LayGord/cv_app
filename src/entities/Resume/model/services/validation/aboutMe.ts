import { AboutMeDataErrors, ErrorTypes } from "../../types/resumeValidationSchema";
import { isEmpty, isShorterThan } from "shared/lib/validation/validation";

const validateAboutMeField = (value?: string): ErrorTypes | undefined => {
    if (!value) return;
    if (!isEmpty(value) && isShorterThan(value, 2)) return 'TOO_SHORT';
};

const validateAboutMe = (value: string): AboutMeDataErrors => {
    const valResult = validateAboutMeField(value);
    return valResult ? { aboutMe: valResult } : {}
}

export const aboutMeValidation = { validateAboutMeField, validateAboutMe };