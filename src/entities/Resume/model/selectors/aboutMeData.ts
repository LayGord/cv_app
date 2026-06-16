import { StateSchema } from "app/providers/StoreProvider";

export const getAboutMe = (state: StateSchema) => state.resume.resumeDraft?.aboutMe;
export const getAboutMeErrors = (state: StateSchema) => state.resume.resumeDraft?.valErrors.aboutMe;