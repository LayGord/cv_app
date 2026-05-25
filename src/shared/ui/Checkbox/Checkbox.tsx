import { InputHTMLAttributes } from "react";
import { ReactComponent as CheckboxBlankIcon } from 'shared/assets/icons/checkbox-blank-outline.svg';
import { ReactComponent as CheckboxIcon } from 'shared/assets/icons/checkbox-outline.svg';
import { classNames, Mods } from "shared/lib/classNames/classNames";
import cls from "./Checkbox.module.scss";


interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' >{
    className?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
}

export const Checkbox = (props: CheckboxProps) => {
    const {
        className,
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
        <label className={classNames(cls.checkboxWrapper, mods, [])}>
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
