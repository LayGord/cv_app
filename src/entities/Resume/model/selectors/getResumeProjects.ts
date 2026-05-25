import { StateSchema } from "app/providers/StoreProvider";

export const getResumeProjects = (state: StateSchema) => state.resume.resumeDraft?.experience.projects;