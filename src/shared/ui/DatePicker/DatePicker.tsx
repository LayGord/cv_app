import { useCallback, useMemo } from "react";
import { classNames, Mods } from "shared/lib/classNames/classNames";
import cls from "./DatePicker.module.scss";


interface DatePickerProps {
    className?: string;
    label?: string;
    value?: string;
    onChange?: (value: string) => void
}

export const DatePicker = (props: DatePickerProps) => {
    const {
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
                type='date'
                className={ classNames(cls.DatePicker, {}, [className]) }
                value={value}
                onChange={onChangeHandler}
                {...otherProps}
            />
        </div>
    );
};
