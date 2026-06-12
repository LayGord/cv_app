import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ProjectData } from "entities/Resume";
import { Input } from "shared/ui/Input/Input";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { TextArea } from "shared/ui/TextArea/TextArea";
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-outline.svg';
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ProjectItem.module.scss";


interface ProjectItemProps {
    className?: string;
    data: ProjectData;
    onUpdate: (value: string, field: keyof ProjectData) => void;
    onDelete: () => void;
    index?: number;
}

export const ProjectItem = (props: ProjectItemProps) => {
    const {
        className,
        data,
        onUpdate,
        onDelete,
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
                    placeholder={t('ProjectsEditor.ProjectItem.name')}
                    value={data.title}
                    onChange={onUpdateTitle}
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
                placeholder={t('ProjectsEditor.ProjectItem.link')}
                value={data.link}
                onChange={onUpdateLink}
            />
            <TextArea 
                id={`description_${data.id}`}
                placeholder={t('ProjectsEditor.ProjectItem.description')}
                value={data.description}
                onChange={onUpdateDescription}
            />
        </div>
    );
};
