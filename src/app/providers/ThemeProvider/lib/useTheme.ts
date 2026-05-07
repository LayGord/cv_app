import { useContext } from "react";
import { AppTheme, ThemeContext } from "./ThemeContext";
import { LOCAL_STORAGE_THEME_KEY } from 'shared/const/localstorage';


interface UseThemeResult {
    theme: AppTheme; 
    applyTheme: (theme: AppTheme) => void;
    toggleTheme: () => void;
};

export function useTheme(): UseThemeResult {
    const {theme, setTheme} = useContext(ThemeContext);

    const applyTheme = (theme: AppTheme) => {
        const container = document.getElementById('theme-container');
        if (!container) {
            document.body.className = theme;
        } else {
            container.className = theme;
        };
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    };

    const toggleTheme = () => {
        const newTheme = theme === AppTheme.LIGHT ? AppTheme.DARK : AppTheme.LIGHT;

        applyTheme(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
        setTheme?.(newTheme);
    };
    return {
        theme: theme || AppTheme.LIGHT,
        applyTheme,
        toggleTheme,
    };
};