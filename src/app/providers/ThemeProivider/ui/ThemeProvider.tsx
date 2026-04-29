import { ReactNode, useMemo, useState } from "react";
import { AppTheme, ThemeContext } from "../lib/ThemeContext";
import { LOCAL_STORAGE_THEME_KEY } from 'shared/const/localstorage';
import { useTheme } from "../lib/useTheme";


const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as AppTheme || AppTheme.LIGHT;

interface ThemeProviderProps {
    initialTheme?: AppTheme;
    children: ReactNode;
}

export const ThemeProvider = (props: ThemeProviderProps) => {
    console.log(defaultTheme)
    const {
        children,
        initialTheme,
    } = props;

    const { applyTheme: initTheme } = useTheme() ;
    const [theme, setTheme] = useState<AppTheme>(initialTheme || defaultTheme);

    initTheme(defaultTheme);

    const defaultObject = useMemo(() => ({
        theme: theme,
        setTheme: setTheme,
    }), [theme])

    return (
        <ThemeContext.Provider value={defaultObject}>
            { children }
        </ThemeContext.Provider>
    )
}