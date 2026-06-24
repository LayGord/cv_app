import { StateSchema } from "app/providers/StoreProvider";

export const getProjects = (state: StateSchema) => state.resume.resumeDraft?.projects;
export const getProjectsErrors = (state: StateSchema) => state.resume.resumeDraft.valErrors.projects;