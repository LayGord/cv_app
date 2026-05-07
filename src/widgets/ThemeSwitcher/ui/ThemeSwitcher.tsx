import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ThemeSwitcher.module.scss";
import { ReactComponent as ThemeIcon } from 'shared/assets/icons/sun-2-linear.svg';
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useTheme } from "app/providers/ThemeProvider";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    return(
        <Button
            className={ classNames(cls.ThemeSwitcher, {}, [className, cls[theme]]) }
            theme={ButtonTheme.CLEAR}
            onClick={toggleTheme}
        >
            <ThemeIcon />
        </Button>
    );
};
