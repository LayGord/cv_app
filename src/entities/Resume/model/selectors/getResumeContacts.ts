import { StateSchema } from "app/providers/StoreProvider";

export const getResumeContacts = (state: StateSchema) => state.resume.resumeDraft?.contacts;