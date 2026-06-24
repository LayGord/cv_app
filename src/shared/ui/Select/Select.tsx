
import { HTMLAttributes, memo, useCallback } from "react";
import { ReactComponent as InfoIcon } from 'shared/assets/icons/alert-circle-outline.svg';
import { classNames, Mods } from "shared/lib/classNames/classNames";
import { Popup, PopupTheme } from "../Popup/Popup";
import cls from "./Select.module.scss";

export interface SelectOption {
    displayName: string;
    value?: string
}

export enum SelectTheme {
    'DEFAULT' = 'default',
    'ERROR' = 'error',
}

interface SelectProps extends Omit<HTMLAttributes<HTMLSelectElement>, 'onChange' | 'onBlur'> {
    id?: string;
    className?: string;
    theme?: SelectTheme;
    options: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
    error?: string;
    hint?: string;
    emptyValue?: string;
    placeholder?: string;
};

export const Select = memo((props: SelectProps) => {
    const {
        id,
        className,
        theme = SelectTheme.DEFAULT,
        options,
        value,
        onChange,
        onBlur,
        error,
        hint,
        emptyValue,
        placeholder,
        ...otherProps
    } = props;

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        return onChange?.(e.target.value);
    }, [onChange]);
    
    const onBlurHandler = useCallback((e: React.FocusEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
        return onBlur?.(e.target.value);
    }, [onBlur]);

    const mods: Mods = {[cls.hasPlaceholder]: Boolean(placeholder)}

    return (
        <div className={classNames(cls.selectWrapper, mods, [cls[theme]])}>
            { placeholder && 
                <div className={cls.placeholder}>{ placeholder }</div>
            }
            <select
                id={id}
                className={ classNames(cls.Select, {}, [className]) }
                value={value}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                {...otherProps}
            >
                { emptyValue && 
                    <option 
                        className={cls.emptyValue}
                        disabled
                        value={''}
                    >
                        {emptyValue}
                    </option>
                }
                {
                    options.map(opt => {
                        return <option key={opt.value} value={opt.value}>{opt.displayName}</option>
                    })
                }
            </select>
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
        </div>
    );
});
Select.displayName = 'Select';