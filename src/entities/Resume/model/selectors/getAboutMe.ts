import { StateSchema } from "app/providers/StoreProvider";

export const getAboutMe = (state: StateSchema) => state.resume.resumeDraft?.aboutMe;