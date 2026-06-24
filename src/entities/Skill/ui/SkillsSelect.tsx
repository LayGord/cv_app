import { classNames } from "shared/lib/classNames/classNames";
import { MultiSelect } from "shared/ui/MultiSelect/MultiSelect";
import cls from "./SkillsSelect.module.scss";
import { skillsList } from "../model/const/skills";


interface SkillsSelectProps {
    className?: string;
    value: string[];
    onChange?: (value: string[]) => void;
    onBlur?: (value: string[]) => void;
    errors?: Record<string, any>
}

export const SkillsSelect = (props: SkillsSelectProps) => {
    const {
        className,
        value,
        onChange,
        onBlur,
        errors,
    } = props;

    return (
        <MultiSelect
            id={"skills"}
            className={ classNames(cls.SkillsSelect, {}, [className]) }
            options={skillsList}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            groupByCategories
            errors={errors}
        />
    );
};
