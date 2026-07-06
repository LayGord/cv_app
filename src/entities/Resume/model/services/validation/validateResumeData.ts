import { createAsyncThunk } from "@reduxjs/toolkit";
import { Resume, ValidationErrors } from "../../types/ResumeSchema";
import { personalDataValidation } from "./personalData";
import { contactsDataValidation } from "./contactsData";
import { aboutMeValidation } from "./aboutMe";
import { objectiveDataValidation } from "./objectiveData";
import { skillsDataValidation } from "./skillsData";
import { jobsDataValidation } from "./jobsData";
import { projectsDataValidation } from "./projectsData";
import { educationDataValidation } from "./educationData";
import { languagesDataValidation } from "./languagesData";


export const validateResumeData = createAsyncThunk<ValidationErrors, Resume, { rejectValue: string }>(
    'resume/validateResumeData',
    async (resumeDraft, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const errors: ValidationErrors = {
                personal: personalDataValidation.validatePersonalData(resumeDraft.personal) || {},
                contacts: contactsDataValidation.validateContactsData(resumeDraft.contacts) || {},
                aboutMe: aboutMeValidation.validateAboutMe(resumeDraft.aboutMe) || {},
                objective: objectiveDataValidation.validateObjectiveData(resumeDraft.objective) || {},
                skills: skillsDataValidation.validateSkillsData(resumeDraft.skills) || {},
                jobs: jobsDataValidation.validateJobsData(resumeDraft.jobs) || {},
                projects: projectsDataValidation.validateProjectsData(resumeDraft.projects) || {},
                education: educationDataValidation.validateEducationData(resumeDraft.education) || {},
                languages: languagesDataValidation.validateLanguageData(resumeDraft.langs) || {},
            };
            return errors;
        } catch (err) {
            console.log(err)
            return rejectWithValue('error');
        }
    }
)