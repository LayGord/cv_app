import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Select } from "shared/ui/Select/Select";
import { Education } from "entities/Resume";
import { gradeOptions } from '../../model/const/educationEditorConsts';
import { useMemo } from "react";


interface GradeSelectProps {
    className?: string;
    id: string;
    value: Education['grade'];
    onChange: (value: Education['grade']) => void;
}

export const GradeSelect = (props: GradeSelectProps) => {
    const { t, i18n } = useTranslation('resume');
    const {
        className,
        id,
        value,
        onChange
    } = props;

    const options = useMemo(() => 
        gradeOptions.map(
            (item) => ({ displayName: i18n.t(item.displayName, {ns: 'resume'}), value: item.value})
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ), [i18n.language]
    );

    return (
        <Select
            className={ classNames('', {}, [className]) }
            id={id}
            placeholder={t('EducationEditor.grade')}
            value={value}
            onChange={onChange as (value: string) => void}
            options={options}
        />
    );
};
