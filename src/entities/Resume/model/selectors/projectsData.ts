import { StateSchema } from "app/providers/StoreProvider";

export const getProjects = (state: StateSchema) => state.resume.resumeDraft?.projects;