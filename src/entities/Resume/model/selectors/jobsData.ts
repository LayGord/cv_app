import { StateSchema } from "app/providers/StoreProvider";

export const getJobs = (state: StateSchema) => state.resume.resumeDraft?.jobs;
export const getJobsErrors = (state: StateSchema) => state.resume.resumeDraft.valErrors.jobs;