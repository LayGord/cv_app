import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Job, Skill, getResumeJobs, getResumeSkills, resumeActions } from "entities/Resume";
import { Group } from "shared/ui/Group/Group";
import { MultiSelect } from "shared/ui/MultiSelect/MultiSelect";
import { FormArray } from "shared/ui/FormArray/FormArray";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { classNames } from "shared/lib/classNames/classNames";
import { JobItem } from "../JobItem/JobItem";
import cls from "./JobsEditor.module.scss";


interface JobsEditorProps {
    className?: string;
};

const skillsList = [
    {"id": "test", "displayName": "test", "category": "test"},
   
];

export const JobsEditor = ({ className }: JobsEditorProps) => {
    const { t } = useTranslation('resume');

    const skills = useSelector(getResumeSkills);
    const jobs = useSelector(getResumeJobs);
    const dispatch = useAppDispatch();

    const onUpdateSkills = useCallback((value: Skill[]) => {
        dispatch(resumeActions.updateSkillsList(value))
    }, [dispatch]);

    const onAddJob = useCallback(() => {
        let id = crypto.randomUUID();
        dispatch(resumeActions.addJob(id))
    }, [dispatch]);
    

    const renderJobs = useCallback((items: Job[]) => {
        let withIndexes = items.length > 1;

        return items?.map((item, index) => {
            const onUpdateJob = (value: string, field: keyof Job) => {
                dispatch(resumeActions.updateJob({
                    ...item,
                    [field]: value,
                }))
            }

            const onDelete = () => {
                dispatch(resumeActions.deleteJob(item.id))
            }
            return (
                <JobItem
                    key={item.id}
                    index={withIndexes ? index + 1 : undefined}
                    data={item}
                    onDelete={onDelete}
                    onUpdate={onUpdateJob}
                />
            )
        })
    }, [dispatch]);

    return (
        <div className={ classNames(cls.JobsEditor, {}, [className]) }>
            <Group title={t("JobsEditor.titleSkills")}>
                <MultiSelect
                    id={"skills"}
                    options={skillsList}
                    value={skills}
                    onChange={onUpdateSkills}
                    groupByCategories
                />
            </Group>
            <FormArray
                title={t("JobsEditor.titleJobs")}
                renderFunction={renderJobs}
                value={jobs}
                onAddNew={onAddJob}
            />
        </div>
    );
};
