import { StateSchema } from "app/providers/StoreProvider";

export const getResumeExperience = (state: StateSchema) => state.resume.resumeDraft?.experience;