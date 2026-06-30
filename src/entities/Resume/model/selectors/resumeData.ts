import { StateSchema } from "app/providers/StoreProvider";

export const getResume = (state: StateSchema) => state.resume;
export const getResumeDraft = (state: StateSchema) => state.resume.resumeDraft;
export const getResumeErrors = (state: StateSchema) => state.resume.resumeDraft.valErrors;
export const getResumeIsLoading = (state: StateSchema) => state.resume.isLodaing;
export const getResumeIsValidating = (state: StateSchema) => state.resume.isValidating;
export const getResumeIds = (state: StateSchema) => state.resume.resumeIds;
export const getResumeCurrentId = (state: StateSchema) => state.resume.currentId;