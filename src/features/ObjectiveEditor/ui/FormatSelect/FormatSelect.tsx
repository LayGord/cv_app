import { classNames } from "shared/lib/classNames/classNames";
import { Select } from "shared/ui/Select/Select";
import { ObjectiveData } from 'entities/Resume';
import { memo, useMemo } from "react";
import { formatOptions } from '../../model/const/objectiveEditorConsts';
import { useTranslation } from "react-i18next";

interface FormatSelectProps {
    className?: string;
    value: ObjectiveData['format'];
    onChange: (value: ObjectiveData['format']) => void;
}


export const FormatSelect = memo(({ className, value, onChange }: FormatSelectProps) => {
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
        />
    );
});
