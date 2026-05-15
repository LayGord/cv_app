import { classNames, Mods } from "shared/lib/classNames/classNames";
import cls from "./Select.module.scss";
import { HTMLAttributes, memo, useCallback } from "react";


interface SelectOption {
    displayValue: string;
    value: string | undefined;
}

interface SelectProps extends Omit<HTMLAttributes<HTMLSelectElement>, 'onChange'> {
    id?: string;
    className?: string;
    options: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    emptyValue?: string;
    placeholder?: string;
};

export const Select = memo((props: SelectProps) => {
    const {
        id,
        className,
        options,
        value,
        onChange,
        emptyValue,
        placeholder,
        ...otherProps
    } = props;

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        return onChange?.(e.target.value);
    }, [onChange]);
    
    const mods: Mods = {[cls.hasPlaceholder]: Boolean(placeholder)}

    return(
        <div className={classNames(cls.selectWrapper, mods, [])}>
            { placeholder && 
                <div className={cls.placeholder}>{ placeholder }</div>
            }
            <select
                id={id}
                className={ classNames(cls.Select, {}, [className]) }
                value={value}
                onChange={onChangeHandler}
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
                        return <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                    })
                }
            </select>
        </div>
    );
});
Select.displayName = 'Select';