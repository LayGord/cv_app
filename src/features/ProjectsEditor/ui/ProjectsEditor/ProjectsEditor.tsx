import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
    ProjectData,
    getProjects, getProjectsErrors,
    projectsDataValidation as val,
    resumeActions,
} from "entities/Resume";
import { FormArray } from "shared/ui/FormArray/FormArray";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { classNames } from "shared/lib/classNames/classNames";
import { ProjectItem } from "../ProjectItem/ProjectItem";
import cls from "./ProjectsEditor.module.scss";


interface ProjectsEditorProps {
    className?: string;
}

export const ProjectsEditor = ({ className }: ProjectsEditorProps) => {
    const { t } = useTranslation('resume');
    const projects = useSelector(getProjects);
    const errors = useSelector(getProjectsErrors);
    const dispatch = useAppDispatch();

    const onAddProject = useCallback(() => {
        let id = crypto.randomUUID();
        dispatch(resumeActions.addProject(id))
    }, [dispatch]);

    const onValidateProjectItemField = useCallback((id: string) => (field: keyof ProjectData) => (value: string) => {
        const error = val.validateProjectItemField(field, value);
        dispatch(resumeActions.setProjectItemFieldError({ id, field, error }))
    }, [dispatch]);
    
    const renderProjects = useCallback((items: ProjectData[]) => {
        let withIndexes = items.length > 1;

        return items?.map((item, index) => {
            const onUpdateJob = (value: string, field: keyof ProjectData) => {
                dispatch(resumeActions.updateProject({
                    ...item,
                    [field]: value,
                }))
            }

            const onDelete = () => {
                dispatch(resumeActions.deleteProject(item.id))
            }
            return (
                <ProjectItem
                    key={item.id}
                    index={withIndexes ? index + 1 : undefined}
                    data={item}
                    onDelete={onDelete}
                    onUpdate={onUpdateJob}
                    validateCb={onValidateProjectItemField(item.id)}
                    errors={errors[item.id]}
                />
            )
        })
    }, [dispatch, onValidateProjectItemField, errors]);

    return (
        <div className={ classNames(cls.ProjectsEditor, {}, [className]) }>
            <FormArray
                title={t("ProjectsEditor.titleProjects")}
                renderFunction={renderProjects}
                value={projects}
                onAddNew={onAddProject}
            />
        </div>
    );
};
