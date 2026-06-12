import { HTMLAttributes, memo, useCallback, useMemo } from "react";
import { ReactComponent as CalendarIcon } from 'shared/assets/icons/calendar-blank-icon.svg';
import { classNames, Mods } from "shared/lib/classNames/classNames";
import cls from "./DatePicker.module.scss";


export enum DatePickerTheme {
    'DEFAULT' = 'default',
    'ERROR' = 'error',
}

interface DatePickerProps extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'> {
    id?: string;
    theme?: DatePickerTheme;
    className?: string;
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
}

export const DatePicker = memo((props: DatePickerProps) => {
    const {
        id,
        theme = DatePickerTheme.DEFAULT,
        className,
        label,
        value,
        onChange,
        onBlur,
        ...otherProps
    } = props;

    const mods: Mods = useMemo(() => ({[cls.hasLabel]: Boolean(label)}), [label]);

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }, [onChange]);

    const onBlurHandler = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(e.target.value)
    }, [onBlur]);

    return(
        <div className={classNames(cls.datePickerWrapper, mods, [cls[theme]])}>
            { label && <span className={cls.label}>{ label }</span>}
            <input
                id={id}
                type='date'
                className={ classNames(cls.DatePicker, {}, [className]) }
                value={value}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                {...otherProps}
            />
            <CalendarIcon className={cls.icon}/>
        </div>
    );
});
DatePicker.displayName = 'DatePicker';