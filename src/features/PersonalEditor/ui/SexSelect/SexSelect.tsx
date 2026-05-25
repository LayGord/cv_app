import { classNames } from "shared/lib/classNames/classNames";
import { sexOptions } from "../../model/const/personalEditorConst";
import { PersonalData } from "entities/Resume";
import { Select } from "shared/ui/Select/Select";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";


interface SexSelectProps {
    className?: string;
    value: PersonalData['sex'];
    onChange: (value: PersonalData['sex']) => void;
};

export const SexSelect = (props: SexSelectProps) => {
    const {
        className,
        value,
        onChange
    } = props;

    const { t, i18n } = useTranslation('resume');

    const options = useMemo(() => sexOptions.map(
        (option) =>  ({ displayName: i18n.t(option.displayName, {ns: 'resume'}), value: option.value})
    ), [i18n]);

    return (
        <Select
            className={classNames('', {}, [className])}
            id="sex"
            placeholder={t("PersonalEditor.sex")}
            options={options}
            value={value}
            onChange={onChange as (value: string) => void}
        />
    );
};
