import { StateSchema } from "app/providers/StoreProvider";

export const getObjective = (state: StateSchema) => state.resume.resumeDraft.objective;
export const getObjectiveErrors = (state: StateSchema) => state.resume.resumeDraft.valErrors.objective;