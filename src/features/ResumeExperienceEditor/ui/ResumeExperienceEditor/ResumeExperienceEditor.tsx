import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Skill, getResumeExperience, resumeActions } from "entities/Resume";
import { NavLinks } from "shared/ui/NavLinks/NavLinks";
import { Group } from "shared/ui/Group/Group";
import { MultiSelect } from "shared/ui/MultiSelect/MultiSelect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { classNames } from "shared/lib/classNames/classNames";
import { JobItem } from "../JobItem/JobItem";
import cls from "./ResumeExperienceEditor.module.scss";


interface ResumeExperienceEditorProps {
    className?: string;
}

const skills = [
    {"id": "test", "displayName": "test", "category": "test"},
   
]

export const ResumeExperienceEditor = ({ className }: ResumeExperienceEditorProps) => {
    const { t } = useTranslation('resume');
    const exp = useSelector(getResumeExperience);
    const dispatch = useAppDispatch();

    const onUpdateSkills = (value: Skill[]) => {
        dispatch(resumeActions.updateSkillsList(value))
    }

    return (
        <div className={ classNames(cls.ResumeExperienceEditor, {}, [className]) }>
            <Group title={t("ResumeExperienceEditor.titleSkills")}>
                <MultiSelect
                    id={"skills"}
                    options={skills}
                    value={exp.skills}
                    onChange={onUpdateSkills}
                    groupByCategories
                />
            </Group>
            <Group title={t("ResumeExperienceEditor.titleJobs")}>
                
            </Group>
            <NavLinks prev={'/edit/contacts'} />
        </div>
    );
};
