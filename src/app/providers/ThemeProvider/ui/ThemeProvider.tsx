import { ReactNode, useEffect, useMemo, useState } from 'react';
import { AppTheme, ThemeContext } from '../lib/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY } from 'shared/const/localstorage';

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as AppTheme) || AppTheme.LIGHT;

interface ThemeProviderProps {
  initialTheme?: AppTheme;
  children: ReactNode;
}

export const ThemeProvider = ({ initialTheme, children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<AppTheme>(initialTheme || defaultTheme);

    useEffect(() => {
        const container = document.getElementById('theme-container');

        if (!container) {
            // default, expected case
            document.body.className = `${theme}`;
        } else {
            // sb only case
            console.log('ENV=Storybook. set theme to #theme-container');
            container.className = `${theme}`;
        };

        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    }, [theme]);

    const value = useMemo(
        () => (
            { theme, setTheme}
        ), [theme]
    );

    return (
        <ThemeContext.Provider value={value}>
            { children }
        </ThemeContext.Provider>
    )
};