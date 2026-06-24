import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ObjectiveData } from 'entities/Resume';
import { formatOptions } from '../../model/const/objectiveEditorConsts';
import { classNames } from "shared/lib/classNames/classNames";
import { Select } from "shared/ui/Select/Select";


interface FormatSelectProps {
    className?: string;
    value: ObjectiveData['format'];
    onChange: (value: ObjectiveData['format']) => void;
    onBlur?: (value: string) => void;
    error?: string;
}

export const FormatSelect = memo((props: FormatSelectProps) => {
    const {
        className,
        value,
        onChange,
        onBlur,
        error,
    } = props;

    const { t, i18n } = useTranslation('resume');

    const options = useMemo(() => formatOptions.map(
        (item) => ({ displayName: i18n.t(item.displayName, {ns: 'resume'}), value: item.value})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ), [i18n.language]);

    return (
        <Select
            className={ classNames('', {}, [className]) }
            placeholder={t('ObjectiveEditor.FormatSelect.format')}
            value={value}
            options={options}
            onChange={onChange as (value: string) => void}
            onBlur={onBlur}
            error={error && t(error, {keyPrefix: 'errors'})}
        />
    );
});
