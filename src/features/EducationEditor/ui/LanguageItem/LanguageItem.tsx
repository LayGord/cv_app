import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { LanguageData } from "entities/Resume";
import { classNames } from "shared/lib/classNames/classNames";
import { Input } from "shared/ui/Input/Input";
import { Select } from "shared/ui/Select/Select";
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-outline.svg';
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import cls from "./LanguageItem.module.scss";


interface LanguageItemProps {
    className?: string;
    data: LanguageData;
    onUpdate: (value: string, field: keyof LanguageData) => void;
    onDelete: () => void;
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
                placeholder={t('language')}
                value={data.language}
                onChange={onUpdateLang}
            />
            <Select
                className={cls.level}
                placeholder={t('level')}
                options={lvlOptions}
                value={data.level}
                onChange={onUpdateLvl}
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
