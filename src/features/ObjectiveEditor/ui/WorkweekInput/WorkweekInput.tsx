import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Input, InputTheme } from "shared/ui/Input/Input";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import cls from './WorkweekInput.module.scss';


interface WorkweekInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
    error?: string;
}

export const WorkweekInput = memo((props: WorkweekInputProps) => {
    const {
        className,
        value,
        onChange,
        onBlur,
        error,
    } = props;

    const { t } = useTranslation('resume');

    // common options
    const onSet40 = useCallback(() => {
        onChange?.('40');
        onBlur?.('40');
    }, [onChange, onBlur])

    const onSet35 = useCallback(() => {
        onChange?.('35');
        onBlur?.('35');
    }, [onChange, onBlur])

    const onSet26 = useCallback(() => {
        onChange?.('26');
        onBlur?.('26');
    }, [onChange, onBlur])

    return (
        <div className={classNames(cls.WorkweekInput, {}, [className])}>
            <Input
                id={'workweek'}
                theme={ error ? InputTheme.ERROR : InputTheme.DEFAULT }
                type={"number"}
                placeholder={t('ObjectiveEditor.WorkweekInput.workweek')}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={error && t(error, {keyPrefix: 'errors'})}
            />
            <div className={cls.commonOptions}>
                <Button
                    theme={ButtonTheme.SECONDARY}
                    onClick={onSet40}
                >
                    {t('ObjectiveEditor.WorkweekInput.40hrs')}
                </Button>
                <Button
                    theme={ButtonTheme.SECONDARY}
                    onClick={onSet35}
                >
                    {t('ObjectiveEditor.WorkweekInput.35hrs')}
                </Button>
                <Button
                    theme={ButtonTheme.SECONDARY}
                    onClick={onSet26}
                >
                    {t('ObjectiveEditor.WorkweekInput.26hrs')}
                </Button>
            </div>
        </div>
    );
});
