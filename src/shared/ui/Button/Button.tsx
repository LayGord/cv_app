import { ButtonHTMLAttributes, ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Button.module.scss";


export enum ButtonTheme {
    'DEFAULT' = 'default',
    'CLEAR' = 'clear',
    'OUTLINE' = 'outline',
    'ACCENT' = 'accent',
};

export enum ButtonSize {
    'S' = 'size_s',
    'M' = 'size_m',
    'L' = 'size_l',
    'XL' = 'size_xl'
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    size?: ButtonSize;
    children: ReactNode;
}

export const Button = (props: ButtonProps) => {

    const {
        className,
        theme = ButtonTheme.DEFAULT,
        size = ButtonSize.M,
        children,
        ...otherProps
    } = props;

    return(
        <button
            className={ classNames(cls.Button, {}, [className, cls[theme], cls[size]]) }
            {...otherProps }
        >
            { children }
        </button>
    );
};
