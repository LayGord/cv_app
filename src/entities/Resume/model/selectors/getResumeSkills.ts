import { StateSchema } from "app/providers/StoreProvider";

export const getResumeSkills = (state: StateSchema) => state.resume.resumeDraft?.skills;