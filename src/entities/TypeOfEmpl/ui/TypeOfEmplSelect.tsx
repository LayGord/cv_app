import { classNames } from "shared/lib/classNames/classNames";
import { MultiSelect } from "shared/ui/MultiSelect/MultiSelect";
import cls from "./TypeOfEmplSelect.module.scss";
import { TypeOfEmplValue } from "../model/types/typeOfEmpl";
import i18n from "shared/config/i18n/i18n";
import { typeOfEmplOptions } from "../model/const/typeOfEmpl";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface TypeOfEmplSelectProps {
    className?: string;
    value: TypeOfEmplValue[]
    onChange?: (value: TypeOfEmplValue[]) => void;
    onBlur?: (value: TypeOfEmplValue[]) => void;
    errors?: Record<string, any>
}

export const TypeOfEmplSelect = (props: TypeOfEmplSelectProps) => {
    
    const { 
        className,
        value,
        onChange,
        onBlur,
        errors,
    } = props;

    const { t } = useTranslation('resume');

    const typeOfEmplOptionsTr= useMemo( () => 
        typeOfEmplOptions.map(
            (item) => ({ id: item.id, displayName: i18n.t(item.displayName, {ns: 'resume'}), value: item.id})
            // eslint-disable-next-line react-hooks/exhaustive-deps
        ), [i18n.language])

    const errorsTr = useMemo(() => 
        errors ? { empty: { id: t('REQUIRED', {keyPrefix: 'errors'}) } } : undefined
        // eslint-disable-next-line react-hooks/exhaustive-deps
    , [i18n.language, errors])

    return (
        <MultiSelect
            className={classNames(cls.TypeOfEmplSelect, {}, [className])}
            id={'typeOfemployment'}
            options={typeOfEmplOptionsTr}
            value={value}
            onChange={onChange as (value: string[]) => void}
            onBlur={onBlur as (value: string[]) => void}
            errors={errorsTr}
        /> 
    );
};
