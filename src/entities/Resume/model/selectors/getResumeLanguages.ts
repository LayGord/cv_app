import { StateSchema } from "app/providers/StoreProvider";

export const getResumeLanguages = (state: StateSchema) => state.resume.resumeDraft?.experience.langs;