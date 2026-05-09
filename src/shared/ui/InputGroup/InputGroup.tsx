import { ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./InputGroup.module.scss";


interface InputGroupProps {
    className?: string;
    title?: string;
    children?: ReactNode;
}

export const InputGroup = (props: InputGroupProps) => {
    const {
        className,
        title,
        children,
    } = props;

    return(
        <div className={ classNames(cls.InputGroup, {}, [className]) }>
            { title && <span className={cls.title}>{title}</span>}
            { children }
        </div>
    );
};
