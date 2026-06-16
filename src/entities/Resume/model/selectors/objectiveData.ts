import { StateSchema } from "app/providers/StoreProvider";

export const getObjective = (state: StateSchema) => state.resume.resumeDraft?.objective;