import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { MultiSelect, MultiSelectOption } from "shared/ui/MultiSelect/MultiSelect";
import cls from "./SkillsSelect.module.scss";
import { loadSkillsByLocale } from "../model/services/loadSkillsByLocale";


interface SkillsSelectProps {
    className?: string;
    value: string[];
    onChange?: (value: string[]) => void;
    onBlur?: (value: string[]) => void;
    error?: string;
}

export const SkillsSelect = (props: SkillsSelectProps) => {
    const {
        className,
        value,
        onChange,
        onBlur,
    } = props;

    const { i18n } = useTranslation();

    const [options, setOptions] = useState<MultiSelectOption[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const loadOptions = useCallback(async () => {
        if ( isLoaded || isLoading) return;

        setIsLoading(true);

        try {
            const skills = await loadSkillsByLocale(i18n.language);
            setIsLoaded(true);
            
            setOptions(skills);
        } finally {
            setIsLoading(false);
        }
    }, [i18n.language, isLoaded, isLoading]);

    useEffect(() => {
        setOptions([])
        setIsLoaded(false);
    }, [i18n.language]);

    return (
        <MultiSelect
            id={"skills"}
            className={ classNames(cls.SkillsSelect, {}, [className]) }
            onOpen={loadOptions}
            isLoading={isLoading}
            options={options}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            groupByCategories
        />
    );
};
