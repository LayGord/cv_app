import { ResumeSchema  } from "entities/Resume";
import { UserSchema } from "entities/User";

export interface StateSchema {
    user: UserSchema;
    resume: ResumeSchema;
};
