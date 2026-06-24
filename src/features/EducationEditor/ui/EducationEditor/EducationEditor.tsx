import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { 
    EducationData,
    LanguageData, 
    educationDataValidation as eduVal,
    languagesDataValidation as langVal,
    getEducation, 
    getEducationErrors, 
    getLanguages, 
    getLanguagesErrors,  
    resumeActions,
} from "entities/Resume";
import { FormArray } from "shared/ui/FormArray/FormArray";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { classNames } from "shared/lib/classNames/classNames";
import { EducationItem } from "../EducationItem/EducationItem";
import { LanguageItem } from "../LanguageItem/LanguageItem";
import cls from "./EducationEditor.module.scss";


interface EducationEditorProps {
    className?: string;
}

export const EducationEditor = ({ className }: EducationEditorProps) => {
    const { t } = useTranslation('resume');
    const educations = useSelector(getEducation);
    const educationErrors = useSelector(getEducationErrors);

    const languages = useSelector(getLanguages);
    const languagesErrors = useSelector(getLanguagesErrors);

    const dispatch = useAppDispatch();

    const onAddEducation = useCallback(() => {
        let id = crypto.randomUUID();
        dispatch(resumeActions.addEducation(id))
    }, [dispatch]);

    const onAddLanguage= useCallback(() => {
        let id = crypto.randomUUID();
        dispatch(resumeActions.addLanguage(id))
    }, [dispatch]);

    const onValidateEducationItemField = useCallback((id: string) => (field: keyof EducationData) => (value?: string) => {
        const error = eduVal.validateEducationItemField(field, value);
        dispatch(resumeActions.setEducationItemFieldError({ id, field, error }));
    }, [dispatch]);

    const onValidateLanguageItemField = useCallback((id: string) => (field: keyof LanguageData) => (value?: string) => {
        const error = langVal.validateLanguageItemField(field, value);
        dispatch(resumeActions.setLanguageItemFieldError({ id, field, error }));
    }, [dispatch]);

    const renderEducation = useCallback((items: EducationData[]) => {
        let withIndexes = items.length > 1;

        return items?.map((item, index) => {
            const onUpdateEducation = (value: string, field: keyof EducationData) => {
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
                    validateCb={onValidateEducationItemField(item.id)}
                    errors={educationErrors[item.id]}
                />
            )
        })
    }, [dispatch, educationErrors, onValidateEducationItemField]);

    const renderLanguage = useCallback((items: LanguageData[]) => {
        return items?.map((item) => {
            const onUpdateLanguage = (value: string, field: keyof LanguageData) => {
                dispatch(resumeActions.updateLanguage({
                    ...item,
                    [field]: value,
                }))
            }
            const onDelete = () => {
                dispatch(resumeActions.deleteLanguage(item.id))
            }
            return (
                <LanguageItem
                    key={item.id}
                    data={item}
                    onDelete={onDelete}
                    onUpdate={onUpdateLanguage}
                    validateCb={onValidateLanguageItemField(item.id)}
                    errors={languagesErrors[item.id]}
                />
            )
        })
    }, [dispatch, languagesErrors, onValidateLanguageItemField]);

    return (
        <div className={ classNames(cls.EducationEditor, {}, [className]) }>
            <FormArray
                title={t("EducationEditor.titleEducations")}
                renderFunction={renderEducation}
                value={educations}
                onAddNew={onAddEducation}
            />
            <FormArray
                title={t("EducationEditor.titleLanguages")}
                renderFunction={renderLanguage}
                value={languages}
                onAddNew={onAddLanguage}
            />
        </div>
    );
};
