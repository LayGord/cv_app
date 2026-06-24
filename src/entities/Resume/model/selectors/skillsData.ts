import { StateSchema } from "app/providers/StoreProvider";

export const getSkills = (state: StateSchema) => state.resume.resumeDraft?.skills;
export const getSkillsErrors = (state: StateSchema) => state.resume.resumeDraft.valErrors.skills;