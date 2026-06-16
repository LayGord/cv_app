import { ErrorTypes } from "../../types/resumeValidationSchema";
import { isEmpty, isShorterThan } from "shared/lib/validation/validation";

const validateAboutMe = (value?: string): ErrorTypes | undefined => {
    if (!value) return;
    if (!isEmpty(value) && isShorterThan(value, 2)) return 'TOO_SHORT';
};

export const aboutMeValidation = { validateAboutMe };