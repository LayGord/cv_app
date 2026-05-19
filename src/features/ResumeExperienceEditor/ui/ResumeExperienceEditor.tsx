import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ResumeExperienceEditor.module.scss";
import { NavLinks } from "shared/ui/NavLinks/NavLinks";
import { Group } from "shared/ui/Group/Group";
import { MultiSelect } from "shared/ui/MultiSelect/MultiSelect";
import { Skill } from "entities/Resume/model/types/ResumeSchema";
import { getResumeExperience } from "entities/Resume/model/selectors/getResumeExperience";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { resumeActions } from "entities/Resume";

interface ResumeExperienceEditorProps {
    className?: string;
}

const skills = [
    {"id": "test", "displayName": "test", "category": "test"},
   
]


export const ResumeExperienceEditor = ({ className }: ResumeExperienceEditorProps) => {

    const exp = useSelector(getResumeExperience);
    const dispatch = useAppDispatch();

    const onUpdateSkills = (value: Skill[]) => {
        dispatch(resumeActions.updateSkillsList(value))
    }

    return (
        <div className={ classNames(cls.ResumeExperienceEditor, {}, [className]) }>
            <Group title="Выберите навыки из предложенных">
                <MultiSelect
                    id={"skills"}
                    options={skills}
                    value={exp.skills}
                    onChange={onUpdateSkills}
                    groupByCategories
                />
            </Group>
            <Group title="Выберите навыки из предложенных">
            </Group>
            <NavLinks prev={'/edit/contacts'} />
        </div>
    );
};
