import { StateSchema } from "app/providers/StoreProvider";

export const getResumeAboutMe = (state: StateSchema) => state.resume.resumeDraft?.aboutMe;