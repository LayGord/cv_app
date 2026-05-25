import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Education, getResumeEducation, resumeActions } from "entities/Resume";
import { FormArray } from "shared/ui/FormArray/FormArray";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { classNames } from "shared/lib/classNames/classNames";
import { EducationItem } from "../EducationItem/EducationItem";
import cls from "./EducationEditor.module.scss";


interface EducationEditorProps {
    className?: string;
}

export const EducationEditor = ({ className }: EducationEditorProps) => {
    const { t } = useTranslation('resume');
    const educations = useSelector(getResumeEducation);
    const dispatch = useAppDispatch();

    const onAddEducation = useCallback(() => {
        let id = crypto.randomUUID();
        dispatch(resumeActions.addEducation(id))
    }, [dispatch]);

    const renderEducation = useCallback((items: Education[]) => {
        let withIndexes = items.length > 1;

        return items?.map((item, index) => {
            const onUpdateEducation = (value: string, field: keyof Education) => {
                dispatch(resumeActions.updateEducation({
                    ...item,
                    [field]: value,
                }))
            }

            const onDelete = () => {
                dispatch(resumeActions.deleteEducation(item.id))
            }
            return (
                <EducationItem
                    key={item.id}
                    index={withIndexes ? index + 1 : undefined}
                    data={item}
                    onDelete={onDelete}
                    onUpdate={onUpdateEducation}
                />
            )
        })
    }, [dispatch]);

    return (
        <div className={ classNames(cls.EducationEditor, {}, [className]) }>
            <FormArray
                title={t("EducationEditor.titleEducations")}
                renderFunction={renderEducation}
                value={educations}
                onAddNew={onAddEducation}
            />
        </div>
    );
};
