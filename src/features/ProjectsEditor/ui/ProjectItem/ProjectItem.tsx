import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ProjectData, ProjectErrorTypes } from "entities/Resume";
import { Input, InputTheme } from "shared/ui/Input/Input";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { TextArea, TextAreaTheme } from "shared/ui/TextArea/TextArea";
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-outline.svg';
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ProjectItem.module.scss";


interface ProjectItemProps {
    className?: string;
    data: ProjectData;
    onUpdate: (value: string, field: keyof ProjectData) => void;
    onDelete: () => void;
    validateCb?: (field: keyof ProjectData) => (value: string) => void;
    errors?: ProjectErrorTypes;
    index?: number;
}

export const ProjectItem = (props: ProjectItemProps) => {
    const {
        className,
        data,
        onUpdate,
        onDelete,
        validateCb,
        errors,
        index
    } = props;

    const { t } = useTranslation('resume');

    const onUpdateTitle = useCallback((value: string) => {
        onUpdate(value, 'title')
    }, [onUpdate]);

    const onUpdateLink= useCallback((value: string) => {
        onUpdate(value, 'link')
    }, [onUpdate]);

    const onUpdateDescription = useCallback((value: string) => {
        onUpdate(value, 'description')
    }, [onUpdate]);

    return (
        <div className={ classNames(cls.ProjectItem, {}, [className]) }>
            <div className={cls.row}>
                { index && <div className={cls.index}>{index}</div>}
                <Input 
                    id={`title_${data.id}`}
                    theme={errors?.title ? InputTheme.ERROR : InputTheme.DEFAULT }
                    placeholder={t('ProjectsEditor.ProjectItem.name')}
                    value={data.title}
                    onChange={onUpdateTitle}
                    onBlur={validateCb?.('title')}
                    error={errors?.title && t(errors.title, {keyPrefix: 'errors'})}
                />
                <Button
                    theme={ButtonTheme.SECONDARY}
                    onClick={onDelete}
                >
                    <DeleteIcon />
                </Button>
            </div>
            <Input 
                id={`link_${data.id}`}
                theme={errors?.link ? InputTheme.ERROR : InputTheme.DEFAULT }
                placeholder={t('ProjectsEditor.ProjectItem.link')}
                value={data.link}
                onChange={onUpdateLink}
                onBlur={validateCb?.('link')}
                error={errors?.link && t(errors.link, {keyPrefix: 'errors'})}
            />
            <TextArea 
                id={`description_${data.id}`}
                theme={errors?.description ? TextAreaTheme.ERROR : TextAreaTheme.DEFAULT }
                placeholder={t('ProjectsEditor.ProjectItem.description')}
                value={data.description}
                onChange={onUpdateDescription}
                onBlur={validateCb?.('description')}
                error={errors?.description && t(errors.description, {keyPrefix: 'errors'})}
            />
        </div>
    );
};
