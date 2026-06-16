import { StateSchema } from "app/providers/StoreProvider";

export const getPersonal = (state: StateSchema) => state.resume.resumeDraft?.personal;
export const getPersonalErrors = (state: StateSchema) => state.resume.resumeDraft?.valErrors.personal;