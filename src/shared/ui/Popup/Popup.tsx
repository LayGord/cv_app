import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Popup.module.scss";
import { ReactNode } from "react";


export enum PopupTheme {
    'DEFAULT' = 'default',
    'ERROR' = 'error',
}

interface PopupProps {
    className?: string;
    children?: ReactNode;
    theme?: PopupTheme;
    visible?: boolean;
}

export const Popup = (props: PopupProps) => {
    const {
        className,
        children,
        theme = PopupTheme.DEFAULT,
        visible = false,
    } = props;

    return (
        <div className={classNames(cls.popupContainer, { [cls.visible]: visible}, [cls[theme]])}>
            <div className={classNames(cls.Popup, {}, [className])}>
                { children }
            </div>
        </div>
    );
};
