import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import i18n from "shared/config/i18n/i18n";
import { classNames } from "shared/lib/classNames/classNames";
import { MultiSelect } from "shared/ui/MultiSelect/MultiSelect";
import cls from "./TypeOfEmplSelect.module.scss";
import { TypeOfEmplValue } from "../model/types/typeOfEmpl";
import { typeOfEmplOptions } from "../model/const/typeOfEmpl";


interface TypeOfEmplSelectProps {
    className?: string;
    value: TypeOfEmplValue[]
    onChange?: (value: TypeOfEmplValue[]) => void;
    onBlur?: (value: TypeOfEmplValue[]) => void;
    error?: string
};

export const TypeOfEmplSelect = (props: TypeOfEmplSelectProps) => {
    
    const { 
        className,
        value,
        onChange,
        onBlur,
        error,
    } = props;

    const { t } = useTranslation('resume');

    const typeOfEmplOptionsTr= useMemo( () => 
        typeOfEmplOptions.map(
            (item) => ({ id: item.id, displayName: i18n.t(item.displayName, {ns: 'resume'}), value: item.id})
            // eslint-disable-next-line react-hooks/exhaustive-deps
        ), [i18n.language])

    return (
        <MultiSelect
            className={classNames(cls.TypeOfEmplSelect, {}, [className])}
            id={'typeOfemployment'}
            options={typeOfEmplOptionsTr}
            value={value}
            onChange={onChange as (value: string[]) => void}
            onBlur={onBlur as (value: string[]) => void}
            error={error? t(error, {keyPrefix: 'errors'}) : undefined}
        /> 
    );
};
