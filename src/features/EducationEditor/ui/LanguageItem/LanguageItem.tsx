import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { LanguageData, LanguagesErrorTypes } from "entities/Resume";
import { classNames } from "shared/lib/classNames/classNames";
import { Input, InputTheme } from "shared/ui/Input/Input";
import { Select, SelectTheme } from "shared/ui/Select/Select";
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-outline.svg';
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import cls from "./LanguageItem.module.scss";


interface LanguageItemProps {
    className?: string;
    data: LanguageData;
    onUpdate: (value: string, field: keyof LanguageData) => void;
    onDelete: () => void;
    validateCb?: (field: keyof LanguageData) => (value?: string) => void;
    errors?: LanguagesErrorTypes;
}

const lvlOptions: { displayName: string, value: LanguageData['level'] }[] = [
    { displayName: 'A1', value: 'a1'},
    { displayName: 'A2', value: 'a2'},
    { displayName: 'B1', value: 'b1'},
    { displayName: 'B2', value: 'b2'},
    { displayName: 'C1', value: 'c1'},
    { displayName: 'C2', value: 'c2'}
];

export const LanguageItem = memo((props: LanguageItemProps) => {
    const {
        className,
        data,
        onUpdate,
        onDelete,
        validateCb,
        errors,
    } = props;

    const  { t } = useTranslation('resume', {keyPrefix: 'EducationEditor.LanguageItem'});
    
    const onUpdateLang = useCallback((value: string) => {
        onUpdate(value, 'language')
    }, [onUpdate]);

    const onUpdateLvl = useCallback((value: string) => {
        onUpdate(value, 'level')
    }, [onUpdate]);

    return (
        <div className={ classNames(cls.LanguageItem, {}, [className]) }>
            <Input
                className={cls.language}
                theme={errors?.language ? InputTheme.ERROR : InputTheme.DEFAULT }
                placeholder={t('language')}
                value={data.language}
                onChange={onUpdateLang}
                onBlur={validateCb?.('language')}
                error={errors?.language && t(errors.language, {keyPrefix: 'errors'})}
            />
            <Select
                className={cls.level}
                theme={errors?.level ? SelectTheme.ERROR : SelectTheme.DEFAULT }
                placeholder={t('level')}
                options={lvlOptions}
                value={data.level}
                onChange={onUpdateLvl}
                onBlur={validateCb?.('level')}
                error={errors?.level && t(errors.level, {keyPrefix: 'errors'})}
            />
            <Button
                theme={ButtonTheme.SECONDARY}
                onClick={onDelete}
            >
                <DeleteIcon />
            </Button>
        </div>
    );
});
