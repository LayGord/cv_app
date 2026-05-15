import { ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./InputGroup.module.scss";

export type InputGroupAlign = 'left' | 'center' | 'right'

interface InputGroupProps {
    className?: string;
    title?: string;
    children?: ReactNode;
    align?: InputGroupAlign;
}

export const InputGroup = (props: InputGroupProps) => {
    const {
        className,
        title,
        children,
        align = 'left',
    } = props;

    return(
        <div className={ classNames(cls.InputGroup, {}, [className]) }>
            { title && <span className={cls.title}>{title}</span>}
            <div className={cls[align]}>
                { children } 
            </div>
        </div>
    );
};
