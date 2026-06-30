import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";
import { ReactNode } from "react";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { ReactComponent as HomeIcon } from 'shared/assets/icons/home.svg';

interface NavbarProps {
    className?: string;
    ResumeSaveBtn?: ReactNode;
    ThemeSwitcher?: ReactNode;
    LangSwitcher?: ReactNode;
}

export const Navbar = (props: NavbarProps) => {
    const {
        className,
        ResumeSaveBtn,
        ThemeSwitcher,
        LangSwitcher
    } = props;

    return (
        <div className={ classNames(cls.Navbar, {}, [className]) }>
            <AppLink
                className={cls.homeLink}
                theme={AppLinkTheme.CLEAR}
                to={'/'}
            >
                <HomeIcon />
            </AppLink>
            { ResumeSaveBtn }
            <div className={cls.switchers}>
                { LangSwitcher }
                { ThemeSwitcher }
            </div>
        </div>
    );
};
