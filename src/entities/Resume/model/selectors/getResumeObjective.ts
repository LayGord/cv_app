import { StateSchema } from "app/providers/StoreProvider";

export const getResumeObjective = (state: StateSchema) => state.resume.resumeDraft?.objective;