import { StateSchema } from "app/providers/StoreProvider";

export const getResumeSkills = (state: StateSchema) => state.resume.resumeDraft?.experience.skills;