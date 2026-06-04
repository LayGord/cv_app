import { InputHTMLAttributes } from "react";
import { ReactComponent as CheckboxBlankIcon } from 'shared/assets/icons/checkbox-blank-outline.svg';
import { ReactComponent as CheckboxIcon } from 'shared/assets/icons/checkbox-outline.svg';
import { classNames, Mods } from "shared/lib/classNames/classNames";
import cls from "./Checkbox.module.scss";


export enum CheckboxTheme {
    'DEFAULT' = 'default',
    'SECONDARY' = 'secondary',
}

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' >{
    className?: string;
    theme?: CheckboxTheme;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
}

export const Checkbox = (props: CheckboxProps) => {
    const {
        className,
        theme = CheckboxTheme.DEFAULT,
        checked = false,
        onChange,
        label,
        ...otherProps
    } = props;

    const mods: Mods = {[cls.checked]: checked}

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.checked)
    }

    return (
        <label className={classNames(cls.checkboxWrapper, mods, [cls[theme]])}>
            <input
                className={cls.Checkbox}
                type="checkbox"
                checked={checked}
                onChange={onChangeHandler}
                {...otherProps}
            />
            { checked ? <CheckboxIcon /> : <CheckboxBlankIcon />}
            { label }
        </label>
        
    );
};
