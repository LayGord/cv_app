import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Select.module.scss";
import { useCallback } from "react";


interface SelectOption {
    displayValue: string;
    value: string | undefined;
}

interface SelectProps {
    className?: string;
    options: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
};

export const Select = (props: SelectProps) => {
    const {
        className,
        options,
        value,
        onChange,
        placeholder,
    } = props;

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        return onChange?.(e.target.value);
    }, [onChange]);

    return(
        <select
            className={ classNames(cls.Select, {}, [className]) }
            value={value}
            onChange={onChangeHandler}
        >
            { placeholder && 
                <option 
                    className={cls.placeholder}
                    disabled
                    value={''}
                >
                    {placeholder}
                </option>
            }
            {
                options.map(opt => {
                    return <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                })
            }
        </select>
    );
};
