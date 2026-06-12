import { StateSchema } from "app/providers/StoreProvider";

export const getPersonal = (state: StateSchema) => state.resume.resumeDraft?.personal;