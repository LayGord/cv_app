import { ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Group.module.scss";

export type GroupAlign = 'left' | 'center' | 'right'
export type GroupDirection = 'column' | 'row';

interface GroupProps {
    className?: string;
    title?: string;
    children?: ReactNode;
    align?: GroupAlign;
    direction?: GroupDirection;
}

export const Group = (props: GroupProps) => {
    const {
        className,
        title,
        children,
        align = 'left',
        direction = 'column'
    } = props;

    return(
        <div className={ classNames(cls.Group, {}, [className]) }>
            { title && <span className={cls.title}>{title}</span>}
            <div className={classNames('', {}, [cls[align], cls[direction]])}>
                { children } 
            </div>
        </div>
    );
};
