import { StateSchema } from "app/providers/StoreProvider";

export const getLanguages = (state: StateSchema) => state.resume.resumeDraft?.langs;