import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";
import { ReactNode } from "react";


interface NavbarProps {
    className?: string;
    ThemeSwitcher?: ReactNode;
    LangSwitcher?: ReactNode;
}

export const Navbar = (props: NavbarProps) => {
    const {
        className,
        ThemeSwitcher,
        LangSwitcher
    } = props;

    return (
        <div className={ classNames(cls.Navbar, {}, [className]) }>
            <div className={cls.switchers}>
                { LangSwitcher }
                { ThemeSwitcher }
            </div>
        </div>
    );
};
