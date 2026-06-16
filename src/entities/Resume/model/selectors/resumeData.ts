import { StateSchema } from "app/providers/StoreProvider";

export const getResume = (state: StateSchema) => state.resume.resumeDraft;