import { classNames } from "shared/lib/classNames/classNames";
import cls from "./AppLink.module.scss";
import { ReactNode } from "react";
import { Link, LinkProps } from "react-router";

interface AppLinkProps extends LinkProps {
    className?: string;
    children?: ReactNode;
}

export const AppLink = (props: AppLinkProps) => {
    const {
        className,
        children,
        to = '/',
        ...otherProps
    } = props;
    return(
        <Link
            className={ classNames(cls.AppLink, {}, [className]) }
            to={to}
            {...otherProps}
        >
            { children }
        </Link>
    );
};
