import { StateSchema } from "app/providers/StoreProvider";

export const getResumeEducation = (state: StateSchema) => state.resume.resumeDraft?.education;