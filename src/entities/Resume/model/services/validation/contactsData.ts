import { ContactsData, ContactLink } from "../../types/ResumeSchema";
import { ContactsDataErrors, LinkErrorTypes, ErrorTypes, LinkErrors } from "../../types/resumeValidationSchema";
import { isEmpty, isShorterThan, isValidEmail, isValidLink, isValidPhoneNumber } from "shared/lib/validation/validation";


const validateContactsDataField = (
    field: keyof ContactsData, value?: string
): ErrorTypes | undefined => {
    switch (field) {

    case 'email':
        if (!value || isEmpty(value as string)) return 'REQUIRED'
        if (isShorterThan(value as string, 2))  return 'TOO_SHORT'
        if (!isValidEmail(value as string)) return 'INVALID_EMAIL'
        return;

    case 'phone':
        if (!value || isEmpty(value as string)) return 'REQUIRED'
        if (!isValidPhoneNumber(value as string)) return 'INVALID_PHONE'
        return;
    };
}

const validateContactLinkField = (
    field: keyof ContactLink, value: string
): ErrorTypes | undefined => {
    switch (field) {
    case 'id':
        if (!value || isEmpty(value)) return 'REQUIRED';
        return;
    case 'title':
        if (!value || isEmpty(value)) return 'REQUIRED'
        if (isShorterThan(value, 2))  return 'TOO_SHORT'
        return;

    case 'link':
        if (!value || isEmpty(value)) return 'REQUIRED'
        if (isShorterThan(value, 2)) return 'TOO_SHORT'
        return;
    };
};

const validateContactLinkItem = (
    value: ContactLink
): LinkErrorTypes | undefined => {
    const errors: LinkErrorTypes = { };
    errors.id = validateContactLinkField('id', value.title);
    errors.title = validateContactLinkField('title', value.title);
    errors.link = validateContactLinkField('link', value.link);

    return Object.values(errors).length > 0 ? { [value.id]: errors} : undefined
}

const validateContactsData = (data: ContactsData): ContactsDataErrors => {
    const errors: ContactsDataErrors = {};

    errors.email = validateContactsDataField('email', data.email);
    errors.phone = validateContactsDataField('phone', data.phone);

    if (data.links) {
        errors.links = data.links.reduce((acc: LinkErrors, link) => {
            acc[link.id] = { ...validateContactLinkItem(link)}
            return acc
        }, {})
    }
    
    return errors;
}

export const contactsDataValidation = {
    validateContactsDataField,
    validateContactLinkField,
    validateContactLinkItem,
    validateContactsData,
}