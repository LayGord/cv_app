import { InputHTMLAttributes, memo, useCallback, useMemo } from "react";
import { classNames, Mods } from "shared/lib/classNames/classNames";
import cls from "./Input.module.scss";


interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>{
    className?: string;
    id?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    placeholder?: string;
}

export const Input = memo((props: InputProps) =>{
    const {
        className,
        id,
        value,
        onChange,
        placeholder,
        ...otherProps
    } = props;

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        return onChange?.(e.target.value)
    }, [onChange]);

    const isLabel = Boolean(placeholder && id);

    const mods: Mods = useMemo(() => ({
        [cls.hasLabel]: isLabel,
    }), [isLabel]);

    return(
        <div className={ classNames(cls.Input, mods, [className]) } >
            <input
                className={cls.inputField}
                id={id}
                value={value}
                onChange={onChangeHandler}
                placeholder={ isLabel ? " " : placeholder}
                {...otherProps}
            />
            { placeholder && id &&
                <label
                    className={cls.inputLabel}
                    htmlFor={id}
                >
                    {placeholder}
                </label> 
            }
        </div>
    );
});
Input.displayName = 'Input';