import { InputHTMLAttributes, memo, useCallback, useMemo } from "react";
import { classNames, Mods } from "shared/lib/classNames/classNames";
import { ReactComponent as ErrorIcon } from 'shared/assets/icons/alert-circle-outline.svg';
import cls from "./Input.module.scss";


export enum InputTheme {
    'DEFAULT' = 'default',
    'ERROR' = 'error',
}

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'>{
    className?: string;
    theme?: InputTheme;
    id?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
    placeholder?: string;
    error?: string;
}

export const Input = memo((props: InputProps) =>{
    const {
        className,
        theme = InputTheme.DEFAULT,
        id,
        value,
        onChange,
        onBlur,
        placeholder,
        error,
        ...otherProps
    } = props;

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        return onChange?.(e.target.value)
    }, [onChange]);

    const onBlurHandler  = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        return onBlur?.(e.target.value)
    }, [onBlur]);

    const isLabel = Boolean(placeholder && id);

    const mods: Mods = useMemo(() => ({
        [cls.hasLabel]: isLabel,
    }), [isLabel]);

    return(
        <div className={ classNames(cls.Input, mods, [className, cls[theme]]) } >
            <input
                className={cls.inputField}
                id={id}
                value={value}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
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
            { error && 
                <>
                    <div className={cls.errorIcon}>
                        <ErrorIcon />
                    </div>
                    <div className={cls.popupContainer}>
                        <div className={cls.errorPopup}>
                            { error }
                        </div>
                    </div>
                </>
            }
        </div>
    );
});
Input.displayName = 'Input';