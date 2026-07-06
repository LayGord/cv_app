import { StateSchema } from "app/providers/StoreProvider";

export const getResumeCurrentId = (state: StateSchema) => state.resume.currentId;
export const getResume = (state: StateSchema) => state.resume;
export const getResumeDraft = (state: StateSchema) => state.resume.resumeDraft;
export const getResumeDraftStatus = (state: StateSchema) => state.resume.resumeDraftStatus;
export const getResumeErrors = (state: StateSchema) => state.resume.resumeDraft.valErrors;
export const getResumeIds = (state: StateSchema) => state.resume.resumeIds;
export const getResumeIdsStatus = (state: StateSchema) => state.resume.resumeIdsStatus;
