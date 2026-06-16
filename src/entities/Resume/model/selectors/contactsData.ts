import { StateSchema } from "app/providers/StoreProvider";

export const getContacts = (state: StateSchema) => state.resume.resumeDraft?.contacts;
export const getContactsErrors = (state: StateSchema) => state.resume.resumeDraft?.valErrors.contacts;