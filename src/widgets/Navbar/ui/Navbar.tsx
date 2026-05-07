import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) =>{
    return(
        <div className={ classNames(cls.Navbar, {}, [className]) }>
            <div className={cls.switchers}>
                <ThemeSwitcher />
            </div>
        </div>
    );
};
