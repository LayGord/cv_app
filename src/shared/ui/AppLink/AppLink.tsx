import { classNames } from "shared/lib/classNames/classNames";
import cls from "./AppLink.module.scss";
import { ReactNode } from "react";
import { Link, LinkProps } from "react-router";

export enum AppLinkTheme {
    DEFAULT = 'default',
    CLEAR = 'clear',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    children?: ReactNode;
    theme?: AppLinkTheme;
}

export const AppLink = (props: AppLinkProps) => {
    const {
        className,
        children,
        to = '/',
        theme = AppLinkTheme.DEFAULT,
        ...otherProps
    } = props;

    return(
        <Link
            className={ classNames(cls.AppLink, {}, [className, cls[theme]]) }
            to={to}
            {...otherProps}
        >
            { children }
        </Link>
    );
};
