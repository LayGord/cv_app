import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { EducationData } from "entities/Resume";
import { classNames } from "shared/lib/classNames/classNames";
import { Select, SelectTheme } from "shared/ui/Select/Select";
import { gradeOptions } from '../../model/const/educationEditorConsts';


interface GradeSelectProps {
    className?: string;
    id: string;
    value: EducationData['grade'];
    onChange: (value: EducationData['grade']) => void;
    onBlur?: (value: string) => void;
    error?: string;
}

export const GradeSelect = (props: GradeSelectProps) => {
    const { t, i18n } = useTranslation('resume');
    const {
        className,
        id,
        value,
        onChange,
        onBlur,
        error,
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
            theme={error ? SelectTheme.ERROR : SelectTheme.DEFAULT }
            placeholder={t('EducationEditor.GradeSelect.grade')}
            value={value}
            onChange={onChange as (value: string) => void}
            options={options}
            onBlur={onBlur}
            error={error && t(error, {keyPrefix: 'errors'})}
        />
    );
};
