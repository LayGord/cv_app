import { StateSchema } from "app/providers/StoreProvider";

export const getEducation = (state: StateSchema) => state.resume.resumeDraft?.education;
export const getEducationErrors = (state: StateSchema) => state.resume.resumeDraft.valErrors.education;