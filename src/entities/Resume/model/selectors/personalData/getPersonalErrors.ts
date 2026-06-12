import { StateSchema } from "app/providers/StoreProvider";

export const getPersonalErrors = (state: StateSchema) => state.resume.resumeDraft?.valErrors.personal;