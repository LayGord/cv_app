import { StateSchema } from "app/providers/StoreProvider";

export const getContacts = (state: StateSchema) => state.resume.resumeDraft?.contacts;