import { classNames } from "shared/lib/classNames/classNames";
import { Input } from "shared/ui/Input/Input";
import cls from './WorkweekInput.module.scss';
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button/Button";
import { memo, useCallback } from "react";


interface WorkweekInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export const WorkweekInput = memo((props: WorkweekInputProps) => {
    const {
        className,
        value,
        onChange
    } = props;

    const { t } = useTranslation('resume');

    // common options
    const onSet40 = useCallback(() => {
        onChange?.('40')
    }, [onChange])

    const onSet35 = useCallback(() => {
        onChange?.('35')
    }, [onChange])

    const onSet26 = useCallback(() => {
        onChange?.('26')
    }, [onChange])

    return (
        <div className={classNames(cls.WorkweekInput, {}, [className])}>
            <Input
                id={'workweek'}
                type={"number"}
                placeholder={t('ObjectiveEditor.WorkweekInput.workweek')}
                value={value}
                onChange={onChange}
            />
            <div className={cls.commonOptions}>
                <Button
                    onClick={onSet40}
                >
                    {t('ObjectiveEditor.WorkweekInput.40hrs')}
                </Button>
                <Button
                    onClick={onSet35}
                >
                    {t('ObjectiveEditor.WorkweekInput.35hrs')}
                </Button>
                <Button
                    onClick={onSet26}
                >
                    {t('ObjectiveEditor.WorkweekInput.26hrs')}
                </Button>
            </div>
        </div>
    );
});
