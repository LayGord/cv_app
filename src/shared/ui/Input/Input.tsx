import { InputHTMLAttributes, memo, useCallback, useMemo } from "react";
import { classNames, Mods } from "shared/lib/classNames/classNames";
import { ReactComponent as InfoIcon } from 'shared/assets/icons/alert-circle-outline.svg';
import cls from "./Input.module.scss";
import { Popup, PopupTheme } from "../Popup/Popup";


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
    hint?: string;
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
        hint,
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
                        <InfoIcon />
                    </div>
                    <Popup
                        className={cls.popup}
                        theme={PopupTheme.ERROR}
                    >
                        {error}
                    </Popup>
                </>
            }
            { hint && 
                <>
                    <div className={cls.hintIcon}>
                        <InfoIcon />
                    </div>
                    <Popup
                        className={cls.popup}
                        theme={PopupTheme.DEFAULT}
                    >
                        {hint}
                    </Popup>
                </>
            }
        </div>
    );
});
Input.displayName = 'Input';