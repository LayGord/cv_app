import { StateSchema } from "app/providers/StoreProvider";

export const getEducation = (state: StateSchema) => state.resume.resumeDraft?.education;