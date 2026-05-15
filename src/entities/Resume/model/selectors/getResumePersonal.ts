import { StateSchema } from "app/providers/StoreProvider";

export const getResumePersonal = (state: StateSchema) => state.resume.resumeDraft?.personal;