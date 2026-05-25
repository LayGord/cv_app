import { StateSchema } from "app/providers/StoreProvider";

export const getResumeJobs = (state: StateSchema) => state.resume.resumeDraft?.experience.jobs;