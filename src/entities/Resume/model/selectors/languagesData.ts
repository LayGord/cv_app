import { StateSchema } from "app/providers/StoreProvider";

export const getLanguages = (state: StateSchema) => state.resume.resumeDraft?.langs;
export const getLanguagesErrors = (state: StateSchema) => state.resume.resumeDraft.valErrors.languages;