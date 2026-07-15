import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { 
    JobData, 
    getJobs, getJobsErrors,
    getSkills, getSkillsErrors, 
    jobsDataValidation as val, 
    resumeActions, 
} from "entities/Resume";
import { SkillsSelect } from "entities/Skill";
import { Group } from "shared/ui/Group/Group";
import { FormArray } from "shared/ui/FormArray/FormArray";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { classNames } from "shared/lib/classNames/classNames";
import { JobItem } from "../JobItem/JobItem";
import cls from "./JobsEditor.module.scss";


interface JobsEditorProps {
    className?: string;
};

export const JobsEditor = ({ className }: JobsEditorProps) => {
    const { t } = useTranslation('resume', {keyPrefix: 'JobsEditor'});

    const skills = useSelector(getSkills);
    const skillsErrors = useSelector(getSkillsErrors);
    const jobs = useSelector(getJobs);
    const jobsErrors = useSelector(getJobsErrors);
    const dispatch = useAppDispatch();


    const onUpdateSkills = useCallback((value: string[]) => {
        dispatch(resumeActions.updateSkillsList(value))
    }, [dispatch]);

    const onAddJob = useCallback(() => {
        let id = crypto.randomUUID();
        dispatch(resumeActions.addJob(id))
    }, [dispatch]);
    
    const onValidateJobItemField = useCallback((id: string) => (field: keyof JobData) =>(value: string) => {
        const error = val.validateJobItemField(field, value);
        dispatch(resumeActions.setJobItemFieldError({ id, field, error }));
    }, [dispatch]);

    const renderJobs = useCallback((items: JobData[]) => {
        let withIndexes = items.length > 1;

        return items?.map((item, index) => {
            const onUpdateJob = (value: string, field: keyof JobData) => {
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
                    validateCb={onValidateJobItemField(item.id)}
                    errors={jobsErrors[item.id]}
                />
            )
        })
    }, [dispatch, jobsErrors, onValidateJobItemField]);

    return (
        <div className={ classNames(cls.JobsEditor, {}, [className]) }>
            <Group title={t("titleSkills")}>
                <SkillsSelect
                    value={skills}
                    onChange={onUpdateSkills}
                    error={skillsErrors}
                />
            </Group>
            <FormArray
                title={t("titleJobs")}
                renderFunction={renderJobs}
                value={jobs}
                onAddNew={onAddJob}
            />
        </div>
    );
};
