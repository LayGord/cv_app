import { HTMLAttributes, memo, useCallback, useMemo } from "react";
import { ReactComponent as CalendarIcon } from 'shared/assets/icons/calendar-blank-icon.svg';
import { classNames, Mods } from "shared/lib/classNames/classNames";
import cls from "./DatePicker.module.scss";


interface DatePickerProps extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
    id?: string;
    className?: string;
    label?: string;
    value?: string;
    onChange?: (value: string) => void
}

export const DatePicker = memo((props: DatePickerProps) => {
    const {
        id,
        className,
        label,
        value,
        onChange,
        ...otherProps
    } = props;

    const mods: Mods = useMemo(() => ({[cls.hasLabel]: Boolean(label)}), [label]);

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }, [onChange]);

    return(
        <div className={classNames(cls.datePickerWrapper, mods, [])}>
            { label && <span className={cls.label}>{ label }</span>}
            <input
                id={id}
                type='date'
                className={ classNames(cls.DatePicker, {}, [className]) }
                value={value}
                onChange={onChangeHandler}
                {...otherProps}
            />
            <CalendarIcon className={cls.icon}/>
        </div>
    );
});
DatePicker.displayName = 'DatePicker';